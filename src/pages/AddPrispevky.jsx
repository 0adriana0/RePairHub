import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/AddPrispevky.module.css';
import pfp from '../img/pfp-default.png';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import camera from "../img/camera.png";

export default function AddPostStep1() {
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState({ name: '', lastName: '', location: '' });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (err) {
        console.error("Chyba při načítání uživatele:", err.message);
      }
    };

    loadUserData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) throw new Error("Cloudinary credentials missing");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!description || !file || !user) {
      alert("Vyplňte popis i obrázek");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) throw new Error("Cloudinary upload failed");

      
      await addDoc(collection(db, "users", user.uid, "posts"), {
        description,
        imageURL: imageUrl,
        hashtags: hashtags
          .split(" ")
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0),
        createdAt: serverTimestamp(),
        userId: user.uid
      });

      alert("Příspěvek úspěšně přidán!");
      navigate("/profil-zakaznik");
    } catch (err) {
      console.error("Chyba při ukládání příspěvku:", err);
      alert("Chyba při ukládání příspěvku: " + err.message);
    }
  };

  return (
    <div className={styles.page}>
      <h2>Přidat příspěvek</h2>
      <div className={styles.background}>
        <div className={styles.container}>
          <img src={pfp} alt="Profilová fotka" className={styles.profilZakaznikImg} />

          <div className={styles.info}>
            <p className={styles.name}>{userData.name} {userData.lastName}</p>
            <p className={styles.location}>{userData.location}</p>
          </div>

          <div className={styles.infoPrispevky}>
            <textarea
              className={styles.textarea}
              placeholder="Přidat popis problému..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="#hashtags (oddělené mezerou)"
              value={hashtags}
              onChange={e => setHashtags(e.target.value)}
              className={styles.textarea}
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className={styles.cameraButton}
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className={styles.previewImage} />
              ) : (
                <img src={camera} alt="Camera" className={styles.cameraIcon} />
              )}
            </button>
          </div>

          <button className={styles.button} onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}
