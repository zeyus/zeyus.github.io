import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const saunaGallery: VaultGallery = {
        position: "end",
        images: [
            { src: "/images/vault/sauna/01.jpg", alt: "Sauna Plan" },
            { src: "/images/vault/sauna/02.jpg", alt: "First delivery" },
            { src: "/images/vault/sauna/03.jpg", alt: "Concrete footings poured" },
            { src: "/images/vault/sauna/04.jpg", alt: "Floor construction" },
            { src: "/images/vault/sauna/05.jpg", alt: "Floor boards going in (don't worry it was just a fit test, there were way more battons)" },
            { src: "/images/vault/sauna/06.jpg", alt: "Floor complete!" },
            { src: "/images/vault/sauna/07.jpg", alt: "Wall framing in progress" },
            { src: "/images/vault/sauna/08.jpg", alt: "Wall framing back and sides done" },
            { src: "/images/vault/sauna/09.jpg", alt: "Front framing done with door opening" },
            { src: "/images/vault/sauna/10.jpg", alt: "Outer insulation layer going on" },
            { src: "/images/vault/sauna/10_0.jpg", alt: "Outer insulation continuned" },
            { src: "/images/vault/sauna/10_1.jpg", alt: "Fiberglass insulation and vapor barrier in progress" },
            { src: "/images/vault/sauna/11.jpg", alt: "Fiberglass insulation and vapor barrier" },
            { src: "/images/vault/sauna/12.jpg", alt: "The sauna stove arrived!" },
            { src: "/images/vault/sauna/13.jpg", alt: "Wall paneling in progress, and extra netting on the ceiling to support the insulation" },
            { src: "/images/vault/sauna/14.jpg", alt: "Ceiling paneling in progress" },
            { src: "/images/vault/sauna/16_1.jpg", alt: "Walls and ceiling paneling almost there" },
            { src: "/images/vault/sauna/16.jpg", alt: "Walls and ceiling paneling done" },
            { src: "/images/vault/sauna/16_2.jpg", alt: "Bench construction (1/3)" },
            { src: "/images/vault/sauna/16_3.jpg", alt: "Bench construction (2/3)" },
            { src: "/images/vault/sauna/16_4.jpg", alt: "Bench construction (3/3)" },
            { src: "/images/vault/sauna/17.jpg", alt: "Formwork for stove base" },
            { src: "/images/vault/sauna/18.jpg", alt: "Stove base cured" },
            { src: "/images/vault/sauna/19.jpg", alt: "Door construction (1/4)" },
            { src: "/images/vault/sauna/20.jpg", alt: "Door construction (2/4)" },
            { src: "/images/vault/sauna/21.jpg", alt: "Door construction (3/4)" },
            { src: "/images/vault/sauna/22.jpg", alt: "Door construction (4/4)" },
            { src: "/images/vault/sauna/23.jpg", alt: "Door installed, inside view" },
            { src: "/images/vault/sauna/24.jpg", alt: "Door installed, outside view" },
            { src: "/images/vault/sauna/26.jpg", alt: "Ventilation port" },
            { src: "/images/vault/sauna/27.jpg", alt: "Stove, fire/heat barrier and chimney in progress" },
            { src: "/images/vault/sauna/28.jpg", alt: "Metal ceiling shield cut and painted for chimney" },
            { src: "/images/vault/sauna/29.jpg", alt: "Custom roof flashing for chimney beat to match profile" },
            { src: "/images/vault/sauna/30.jpg", alt: "First stove fire! (and chimney smoke test)" },
            { src: "/images/vault/sauna/31.jpg", alt: "Roof with chimney being power-washed" },
            { src: "/images/vault/sauna/32.jpg", alt: "Finished construction, view from the woodshed" },
            { src: "/images/vault/sauna/33.jpg", alt: "Finished construction, inside the door" },
            { src: "/images/vault/sauna/34.jpg", alt: "Finished construction, view from the bench" },
            { src: "/images/vault/sauna/36.jpg", alt: "Woodshed setup up and sauna exterior oiled" },
            { src: "/images/vault/sauna/38.jpg", alt: "View at night with lanterns" },
            { src: "/images/vault/sauna/39.jpg", alt: "Time to enjoy the sauna!" }
        ]
    };
    const saunaProject: VaultPageProps = {
        title: "Building a Sauna",
        date: "2024-12-10",
        feature_image: {
          src: "/images/vault/sauna/33.jpg",
          alt: "Our very own sauna"
        },
        gallery: saunaGallery
    };
    return {
        props: saunaProject
    };
};
