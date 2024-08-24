import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="d-flex flex-column align-items-center ">
      <h1>My Movie Library'e Hoş Geldiniz.</h1>
      <div className="welcomeMessage">
        <p>
          Bu uygulamada kullanıcıların kendi film portföylerini oluşturup
          puanlamaları amaçlanmıştır. Kullanıcılar izledikleri filmleri kendi
          profilleri üzerinde ekleyibilirler.
        </p>
        <p>
          Aynı zamanda diğer kullanıcıların eklemiş olduğu filmleri
          listeleyebilir, kategorilerine göre filtreleyebilir, isimlerine göre
          aratabilirler.
        </p>
      </div>

      <div className="Router d-flex flex-column gap-3">
        <button className="btn btn-dark" onClick={() => navigate("/movies")}>
          Tüm Filmleri Görüntüle
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-movie")}
        >
          Yeni Film Ekle
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/my-movies")}
        >
          Bu Kullanıcının Eklediği Filmleri Görüntüle / Düzenle / Sil
        </button>
      </div>
    </div>
  );
};

export default Home;
