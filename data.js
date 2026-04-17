/*
  data.js la noi ban sua toan bo noi dung website.
  Sau nay chi can:
  1. Upload anh vao /photos/
  2. Upload video vao /videos/
  3. Sua ten file, tieu de, mo ta, caption trong file nay
  4. Commit len GitHub
*/

const siteData = {
  // Tieu de lon hien o dau trang va tren thanh tren cung
  siteTitle: "Nhung Nam Thang Cap 3",

  // Ten truong se hien o cum thong tin ben phai
  schoolName: "THPT Nguyen Du",

  // Nien khoa hoac nam hoc
  years: "2021 - 2024",

  // Danh sach ky niem
  memories: [
    {
      title: "Ngay khai giang",
      description: "Buoi sang dau tien cua nam hoc moi, dong phuc con tinh tan va ai cung vua hao huc vua hoi hop.",
      cards: [
        {
          type: "photo",
          src: "photos/khai-giang-1.jpg",
          caption: "Chung minh ngay ay"
        },
        {
          type: "photo",
          src: "photos/khai-giang-2.jpg",
          caption: "San truong day nang"
        },
        {
          type: "video",
          src: "videos/khai-giang.mp4",
          caption: "Mot doan phim ngan"
        }
      ]
    },
    {
      title: "Gio ra choi",
      description: "Nhung phut nghi ngan nhung luc nao cung ron rang, tu nhung cau chuyen vu vo den nhung buc anh chup voi ban be.",
      cards: [
        {
          type: "photo",
          src: "photos/gio-ra-choi-1.jpg",
          caption: "Nhung tieng cuoi quen thuoc"
        },
        {
          type: "photo",
          src: "photos/gio-ra-choi-2.jpg",
          caption: "Goc hanh lang than thuong"
        },
        {
          type: "photo",
          src: "photos/gio-ra-choi-3.jpg",
          caption: "Mot ngay binh yen"
        }
      ]
    },
    {
      title: "Chuyen di da ngoai",
      description: "Khoang thoi gian ca lop di cung nhau va luu lai that nhieu anh dep de ve sau nho lai.",
      cards: [
        {
          type: "photo",
          src: "photos/da-ngoai-1.jpg",
          caption: "Chuyen xe hom do"
        },
        {
          type: "video",
          src: "videos/da-ngoai.mp4",
          caption: "Doan clip dang nho"
        },
        {
          type: "photo",
          src: "photos/da-ngoai-2.jpg",
          caption: "Ca lop trong mot khung hinh"
        }
      ]
    },
    {
      title: "Mua on thi",
      description: "Nhung ngay hoc them, on tap va dong vien nhau vuot qua nhung bai kiem tra cuoi cung.",
      cards: [
        {
          type: "photo",
          src: "photos/on-thi-1.jpg",
          caption: "Ban hoc day ghi chu"
        },
        {
          type: "photo",
          src: "photos/on-thi-2.jpg",
          caption: "Cung nhau co gang"
        },
        {
          type: "photo",
          src: "photos/on-thi-3.jpg",
          caption: "Mot mua he rat dai"
        }
      ]
    },
    {
      title: "Le truong thanh",
      description: "Khoanh khac chia tay va truong thanh, noi nhieu xuc dong nhat trong ca hanh trinh cap 3.",
      cards: [
        {
          type: "photo",
          src: "photos/truong-thanh-1.jpg",
          caption: "Tam anh cuoi cung"
        },
        {
          type: "photo",
          src: "photos/truong-thanh-2.jpg",
          caption: "Ao trang va hoa"
        },
        {
          type: "video",
          src: "videos/truong-thanh.mp4",
          caption: "Khoanh khac ket thuc"
        }
      ]
    }
  ]
};
