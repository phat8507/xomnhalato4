# Memory Lane cho GitHub Pages

Website nay duoc thiet ke de de cap nhat ve sau:

1. Upload anh vao thu muc `photos/`
2. Upload video vao thu muc `videos/`
3. Mo file `data.js`
4. Sua noi dung, ten file, caption, mo ta
5. Commit changes
6. GitHub Pages tu cap nhat

Website khong con dung `localStorage` cho noi dung chinh. Moi nguoi mo link deu se thay cung mot noi dung vi du lieu nam truc tiep trong repository.

## Cac file dung de lam gi

- `index.html`: khung trang chinh
- `style.css`: giao dien trang chinh
- `app.js`: logic hien thi cho trang chinh
- `data.js`: file ban se sua de doi noi dung website
- `admin.html`: trang huong dan cho nguoi moi
- `admin.css`: giao dien trang huong dan
- `admin.js`: script nho cho trang huong dan
- `photos/`: noi luu anh
- `videos/`: noi luu video

## File ban can sua khi muon cap nhat

### 1. Them anh moi

- Upload anh vao `photos/`
- Mo `data.js`
- Them mot card moi vao dung ky niem

Vi du:

```js
{
  type: "photo",
  src: "photos/ao-trang-san-truong.jpg",
  caption: "San truong hom ay"
}
```

### 2. Them video moi

- Upload video vao `videos/`
- Mo `data.js`
- Them mot card moi voi `type: "video"`

Vi du:

```js
{
  type: "video",
  src: "videos/khai-giang.mp4",
  caption: "Mot doan phim ngan"
}
```

### 3. Them mot ky niem moi

Mo `data.js`, tim mang `memories`, sau do them mot object moi:

```js
{
  title: "Ngay be giang",
  description: "Mot vai dong mo ta cho ky niem nay",
  cards: [
    {
      type: "photo",
      src: "photos/be-giang-1.jpg",
      caption: "Tam anh minh thich nhat"
    }
  ]
}
```

### 4. Doi tieu de website

Mo `data.js` va sua dong:

```js
siteTitle: "Nhung Nam Thang Cap 3",
```

### 5. Doi ten truong va nam hoc

Mo `data.js` va sua 2 dong:

```js
schoolName: "THPT Nguyen Du",
years: "2021 - 2024",
```

## Cau truc cua data.js

File `data.js` co dang:

```js
const siteData = {
  siteTitle: "Nhung Nam Thang Cap 3",
  schoolName: "THPT ...",
  years: "2021 - 2024",
  memories: [
    {
      title: "Ngay khai giang",
      description: "Mot vai dong mo ta",
      cards: [
        {
          type: "photo",
          src: "photos/khai-giang.jpg",
          caption: "Chung minh ngay ay"
        },
        {
          type: "video",
          src: "videos/khai-giang.mp4",
          caption: "Mot doan phim ngan"
        }
      ]
    }
  ]
};
```

## Vi du cu the: them anh moi tu dau den cuoi

Vi du ban muon them anh moi ten `ao-trang-san-truong.jpg`:

1. Mo repository tren GitHub
2. Vao thu muc `photos/`
3. Bam `Add file` -> `Upload files`
4. Upload file `ao-trang-san-truong.jpg`
5. Commit file anh
6. Mo file `data.js`
7. Tim ky niem ban muon them anh
8. Them doan nay vao mang `cards`

```js
{
  type: "photo",
  src: "photos/ao-trang-san-truong.jpg",
  caption: "San truong hom ay"
}
```

9. Bam `Commit changes`
10. Cho 1-2 phut roi mo lai website

## Cach mo trang huong dan

Sau khi deploy, mo:

```text
https://[username].github.io/[repo]/admin.html
```

## Cach bat GitHub Pages

1. Tao repository moi tren GitHub
2. Upload toan bo file du an len repo
3. Vao `Settings`
4. Chon `Pages`
5. O `Source`, chon `Deploy from a branch`
6. Chon nhanh `main`
7. Chon thu muc `/ (root)`
8. Bam `Save`

Sau khi bat xong:

- Trang chinh: `https://[username].github.io/[repo]/`
- Trang huong dan: `https://[username].github.io/[repo]/admin.html`

## Ghi chu quan trong

- Ten file trong `data.js` phai giong chinh xac ten file ban upload
- Anh nen dat trong `photos/`
- Video nen dat trong `videos/`
- Neu sua xong ma website chua doi ngay, hay doi 1-2 phut de GitHub Pages cap nhat
