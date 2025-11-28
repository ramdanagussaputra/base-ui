import StyleguideGroup from "@/component/styleguide/StyleguideGroup";
import StyleguideSubtitle from "@/component/styleguide/StyleguideSubtitle";
import { CardSlider as CardSliderComponent } from "massive-base-ui";

function CardSlider() {
  return (
    <StyleguideGroup>
      <StyleguideSubtitle>Card Slider</StyleguideSubtitle>

      <CardSliderComponent
        items={[
          {
            title: "Step 1. Masuk Google Cloud Console",
            mode: "list-number",
            image: {
              src: "https://placehold.co/400",
              alt: "avatar-1",
            },
            descriptionContent: [
              {
                text: "Kunjungi console.cloud.google.com",
                hyperlink: [
                  {
                    index: 1,
                    href: "https://console.cloud.google.com",
                  },
                ],
              },
              {
                text: "Login dengan akun Google Anda.",
              },
            ],
          },
          {
            title: "Step 2. Pilih Project",
            mode: "list-number",
            image: {
              src: "https://placehold.co/400",
              alt: "avatar-2",
            },
            descriptionContent: [
              {
                text: "Klik Selected Project yang ada di pojok kiri atas, atau menggunakan shortcut (ctrl + O).",
              },
              {
                text: "Selanjutnya anda bisa memiliki project yang ingin digunakan.",
              },
            ],
          },
          {
            title: "Step 3. Buka Menu Billing",
            mode: "description",
            image: {
              src: "https://placehold.co/400",
              alt: "avatar-3",
            },
            descriptionContent:
              "Setelah berada di dalam project yang diinginkan, buka menu navigasi di pojok kiri atas, lalu pilih Billing.",
          },
          {
            title: "Step 4. Pilih atau Buat Akun Billing",
            mode: "custom",
            image: {
              src: "https://placehold.co/400",
              alt: "avatar-4",
            },
            descriptionContent: (
              <div className="bg-primary-500 rounded-2xl">
                <p className="text-b3-400">Example Custom Component</p>
              </div>
            ),
          },
        ]}
      />
    </StyleguideGroup>
  );
}

export default CardSlider;
