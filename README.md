# Memory Lane - Website kỷ niệm cho GitHub Pages

Đây là bộ website tĩnh gồm:

- `index.html`: trang chính để xem kỷ niệm
- `admin.html`: trang quản trị để nhập nội dung, ảnh và video
- `style.css`, `app.js`: giao diện và logic cho trang chính
- `admin.css`, `admin.js`: giao diện và logic cho trang quản trị

Toàn bộ dữ liệu được lưu trong `localStorage` với key:

```text
memoryLaneData
```

## Cách mở trang Admin

Sau khi deploy lên GitHub Pages, thêm `/admin.html` vào cuối URL.

Ví dụ:

```text
https://username.github.io/repo/admin.html
```

## Cách đổi mật khẩu admin

Mật khẩu mặc định hiện tại là:

```text
capba2024
```

Muốn đổi, mở file `admin.js` và tìm dòng:

```js
const ADMIN_PASSWORD = "capba2024";
```

Sau đó đổi thành mật khẩu bạn muốn.

## Cách thêm kỷ niệm mới

Hiện tại website có sẵn 5 khối kỷ niệm. Bạn vào `admin.html`, đăng nhập rồi:

1. Mở từng thẻ kỷ niệm.
2. Nhập `Tên kỷ niệm`.
3. Nhập `Mô tả kỷ niệm`.
4. Thêm `Chú thích` cho từng ảnh/video.
5. Nếu cần thêm media, bấm `Thêm ô media`.

Mỗi kỷ niệm hỗ trợ tối đa 6 ô media.

## Cách upload ảnh/video

Mỗi ô media hỗ trợ các định dạng:

- `jpg`
- `png`
- `webp`
- `mp4`

Bạn có thể:

- kéo thả file vào khung
- hoặc bấm vào khung để chọn file

Sau khi chọn file:

- ảnh/video sẽ được chuyển sang base64
- lưu vào `localStorage`
- hiển thị preview ngay trong trang admin
- trang chính sẽ đọc lại dữ liệu đó và hiển thị thật

## Cách lưu nội dung

Ở thanh dưới cùng của trang admin, bấm:

```text
💾 Lưu & Cập nhật Website
```

Sau khi lưu xong sẽ hiện thông báo:

```text
✅ Đã lưu! Website đã được cập nhật.
```

## Cách bật GitHub Pages

1. Tạo repository mới trên GitHub.
2. Upload toàn bộ file dự án lên repository.
3. Vào `Settings`.
4. Chọn `Pages`.
5. Trong phần `Build and deployment`:
   - `Source`: chọn `Deploy from a branch`
   - `Branch`: chọn `main` hoặc `master`
   - thư mục: chọn `/ (root)`
6. Bấm `Save`.
7. Chờ khoảng 1-2 phút để GitHub Pages xuất bản website.

Sau khi bật xong, URL trang chính thường là:

```text
https://username.github.io/repo/
```

Trang admin:

```text
https://username.github.io/repo/admin.html
```

## Ghi chú quan trọng

- Dữ liệu `localStorage` được lưu theo từng trình duyệt.
- Nếu bạn đổi máy hoặc đổi trình duyệt, dữ liệu đã nhập sẽ không tự đồng bộ.
- Nếu muốn lưu media cố định trong repo, bạn có thể dùng thư mục `/photos/` và `/videos/`.
