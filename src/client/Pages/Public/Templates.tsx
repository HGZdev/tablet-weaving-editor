import React from "react";
import {ButtonPrimary} from "../../Components/Buttons";
import PageFrame from "../../Components/PageFrame";
import draft1 from "./Editor/__fixtures__/draft1";
import draft2 from "./Editor/__fixtures__/draft2";
import draft3 from "./Editor/__fixtures__/draft3";
import {useDraft} from "./Editor/DraftContext/useDraft";
import {useNavigate} from "react-router-dom";

const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

interface Template {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  file: Draft<any, any, any>;
}

const templates: Template[] = [
  {
    id: 1,
    title: "Spiral Pattern",
    description:
      "A clean, basic geometric pattern ideal for beginners. It features interlocking shapes with a bold blue and black color scheme, forming a continuous spiral effect. This pattern is straightforward, making it a good starting point for novice weavers to practice geometric designs.",
    imageUrl: `${VITE_BASE_URL}/images/draft2.png`,
    file: draft2,
  },
  {
    id: 2,
    title: "Floral Pattern",
    description:
      "A floral pattern recommended for advanced weavers. The design uses a complex arrangement of shapes and colors, with greens, yellows, and blacks forming a detailed, symmetrical floral motif. The level of detail and color usage make this pattern challenging but rewarding for experienced weavers looking to create floral designs.",
    imageUrl: `${VITE_BASE_URL}/images/draft1.png`,
    file: draft1,
  },
  {
    id: 3,
    title: "Viking Belt Pattern",
    description:
      "A pattern inspired by traditional Viking belt designs, featuring knot-like shapes and earthy tones. This template is suitable for weaving belts or straps with a historical aesthetic. Great for intermediate to advanced weavers, this pattern allows for the creation of strong, decorative bands, perfect for historical or themed projects.",
    imageUrl: `${VITE_BASE_URL}/images/draft3.png`,
    file: draft3,
  },
];

const TemplateCard: React.FC<{template: Template}> = ({template}) => {
  const navigate = useNavigate();
  const {imageUrl, title, description, file} = template;
  const {onUploaded} = useDraft();

  const onLoadDraft = () => {
    onUploaded(file);
    navigate(`${BASE_URL}/editor`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white border rounded-lg shadow-lg py-8 px-4 mb-4 gap-4 max-w-3xl mx-auto">
      <div className="flex justify-center md:w-1/3">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-[80%] h-full rounded"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between md:pr-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
        </div>
        <ButtonPrimary className="mt-auto" onClick={onLoadDraft}>
          Use this Template
        </ButtonPrimary>
      </div>
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black bg-opacity-50 p-4 rounded-md  mb-8">
          <h1 className="text-3xl text-center text-primary-content font-bold mb-4">
            Templates gallery
          </h1>
          <p className="text-lg text-center text-primary-content ">
            Explore our selection of weaving templates, designed for both
            beginners and advanced weavers.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {templates.map((template, idx) => (
            <TemplateCard key={idx} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Templates: React.FC = () => {
  return <PageFrame {...{Main}} />;
};

export default Templates;
