import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    const saunaGallery: VaultGallery = {
        position: "none",
        images: [
            { src: "./images/01.jpg", alt: "Sauna Plan" },
            { src: "./images/02.jpg", alt: "First delivery" },
            { src: "./images/03.jpg", alt: "Concrete footings poured" },
            { src: "./images/04.jpg", alt: "Floor construction" },
            { src: "./images/05.jpg", alt: "Floor boards going in (don't worry it was just a fit test, there were way more battons)" },
            { src: "./images/06.jpg", alt: "Floor complete!" },
            { src: "./images/07.jpg", alt: "Wall framing in progress" },
            { src: "./images/08.jpg", alt: "Wall framing back and sides done" },
            { src: "./images/09.jpg", alt: "Front framing done with door opening" },
            { src: "./images/10.jpg", alt: "Outer insulation layer going on" },
            { src: "./images/10_0.jpg", alt: "Outer insulation continuned" },
            { src: "./images/10_1.jpg", alt: "Fiberglass insulation and vapor barrier in progress" },
            { src: "./images/11.jpg", alt: "Fiberglass insulation and vapor barrier" },
            { src: "./images/12.jpg", alt: "The sauna stove arrived!" },
            { src: "./images/13.jpg", alt: "Wall paneling in progress, and extra netting on the ceiling to support the insulation" },
            { src: "./images/14.jpg", alt: "Ceiling paneling in progress" },
            { src: "./images/16_1.jpg", alt: "Walls and ceiling paneling almost there" },
            { src: "./images/16.jpg", alt: "Walls and ceiling paneling done" },
            { src: "./images/16_2.jpg", alt: "Bench construction (1/3)" },
            { src: "./images/16_3.jpg", alt: "Bench construction (2/3)" },
            { src: "./images/16_4.jpg", alt: "Bench construction (3/3)" },
            { src: "./images/17.jpg", alt: "Formwork for stove base" },
            { src: "./images/18.jpg", alt: "Stove base cured" },
            { src: "./images/19.jpg", alt: "Door construction (1/4)" },
            { src: "./images/20.jpg", alt: "Door construction (2/4)" },
            { src: "./images/21.jpg", alt: "Door construction (3/4)" },
            { src: "./images/22.jpg", alt: "Door construction (4/4)" },
            { src: "./images/23.jpg", alt: "Door installed, inside view" },
            { src: "./images/24.jpg", alt: "Door installed, outside view" },
            { src: "./images/26.jpg", alt: "Ventilation port" },
            { src: "./images/27.jpg", alt: "Stove, fire/heat barrier and chimney in progress" },
            { src: "./images/28.jpg", alt: "Metal ceiling shield cut and painted for chimney" },
            { src: "./images/29.jpg", alt: "Custom roof flashing for chimney beat to match profile" },
            { src: "./images/30.jpg", alt: "First stove fire! (and chimney smoke test)" },
            { src: "./images/31.jpg", alt: "Roof with chimney being power-washed" },
            { src: "./images/32.jpg", alt: "Finished construction, view from the woodshed" },
            { src: "./images/33.jpg", alt: "Finished construction, inside the door" },
            { src: "./images/34.jpg", alt: "Finished construction, view from the bench" },
            { src: "./images/36.jpg", alt: "Woodshed setup up and sauna exterior oiled" },
            { src: "./images/38.jpg", alt: "View at night with lanterns" },
            { src: "./images/39.jpg", alt: "Time to enjoy the sauna!" },
            { src: "./images/sauna_nosound.mp4", alt: "It's the sauna." }
        ]
    };
    const saunaProject: VaultPageProps = {
        title: "Building a Sauna",
        date: new Date('2025-01-08'),
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
