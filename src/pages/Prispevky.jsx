import styles from "../styles/Prispevky.module.css";
import defaultPfp from '../img/pfp-default.png';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfilPrispevky = () => {
  const [pfp, setPfp] = useState(defaultPfp);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const loadProfileAndPosts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      let userData = {};
      if (snap.exists()) {
        const data = snap.data();
        userData = {
          name: data.name || "",
          lastName: data.lastName || "",
          location: data.location || "",
          profilePhotoUrl: data.profilePhotoUrl || defaultPfp
        };
        setPfp(userData.profilePhotoUrl);
      }

      const postsRef = collection(db, "users", user.uid, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, snapshot => {
        const arr = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
          userData 
        }));
        setPosts(arr);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(err.message);
    }
  };

  loadProfileAndPosts();
}, []);


  return (
    <div className={styles.PrispevkyAll}>
      <button className={styles.exit} onClick={()=> navigate("/profil-zakaznik")}>ᐸ</button>
      <h2 className={styles.title}>Příspěvky</h2>
      <img
        src={pfp}
        alt="Profilová fotka"
        className={styles.ProfileImg}
      />
      <div className={styles.postsList}>
        {posts.length === 0 ? (
          <p style={{ marginTop: 20 }}>Zatím nic není</p>
        ) : (
          posts.map(post => <PostItem key={post.id} post={post} />)
        )}
      </div>
      <button className={styles.pridat} onClick={()=> navigate("/profil-zakaznik/add/step1")}>Přidat příspěvek</button>
    </div>
  );
};

const PostItem = ({ post }) => {
  const [open, setOpen] = useState(false);
  const { name, lastName, location } = post.userData;

  return (
    <div className={styles.postItem}>
      <div className={styles.postHeader}>
        <button className={styles.arrow} onClick={() => setOpen(o => !o)}>{open ? "˄" : "˅"}</button>
        <img
          src={defaultPfp}
          alt="Profilová fotka"
          className={styles.ProfilPhoto}
        />
        <div className={styles.cont}>
        <p className={styles.nameLastName}><strong>{name} {lastName}</strong></p>
        <p className={styles.location}>{location}</p>
        </div>
        {post.description && (
          <p className={styles.description}>{post.description}</p>
        )}
      </div>
      {open && post.imageURL && (
        <div className={styles.postImage}>
          <img src={post.imageURL} alt="Post" />
        </div>
      )}
      {open && post.hashtags && post.hashtags.length > 0 && (
        <div className={styles.postTags}>
          {post.hashtags.join(" ")}
        </div>
      )}
    </div>
  );
};


export default ProfilPrispevky;
