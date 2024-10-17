import PageFrame from "../../Components/PageFrame";

const Main = () => {
  return (
    <div className="flex flex-1">
      <div className="container bg-base-100 my-8 mx-auto p-8  rounded-md">
        <h1 className="text-3xl font-bold mb-6">
          Keep Calm and Weave the Belt!
        </h1>
        <p className="text-lg mb-4">
          Welcome to the most user-friendly tablet weaving pattern creation tool
          on the web! Whether you're an experienced weaver or just starting out
          🌱, our platform makes it easier than ever to design your own unique
          weaving patterns. While there are many tools out there, ours stands
          out for its simplicity and intuitive interface.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-4">
          🧵 What is Tablet Weaving?
        </h2>
        <p className="text-lg mb-4">
          Tablet weaving is an ancient and versatile textile technique used to
          produce strong and decorative bands, straps, and trims. By using small
          cards to manipulate warp threads, weavers can create anything from
          simple stripes to complex, beautiful patterns 🌟.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-4">
          🔍 What Makes Our Tool Different?
        </h2>
        <p className="text-lg mb-4">
          We know there are plenty of tablet weaving pattern generators out
          there, but our tool is designed with usability in mind 🎯. Here’s why
          it's one of the most handy options you'll find:
        </p>
        <ul className="text-lg mb-4">
          <li>
            <strong>User-Friendly Interface:</strong> No complicated setup or
            learning curve. Our tool is built to be intuitive, so you can focus
            on designing without getting stuck on technical details.
          </li>
          <li>
            <strong>Real-Time Pattern Visualization:</strong> See your pattern
            evolve as you make changes. Every adjustment in threading or tablet
            turns is instantly reflected in the preview, helping you experiment
            easily.
          </li>
          <li>
            <strong>Fully Customizable:</strong> From selecting the number of
            tablets to choosing thread colors and rotation sequences, you have
            total control to create a pattern that’s uniquely yours ✨.
          </li>
          <li>
            <strong>Quick and Easy Export/Import:</strong> Once your design is
            complete, download a draft so you can keep it saved as long as you
            can and bring your vision to life 🎉.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-4">⚙️ How It Works</h2>
        <ul className="text-lg mb-4">
          <li>
            <strong>Set Up Your Project:</strong> Choose your warp threads,
            tablet numbers, and colors to begin 🎨.
          </li>
          <li>
            <strong>Design With Ease:</strong> Adjust threading and tablet
            rotations in our easy-to-navigate interface. No need to be a tech
            expert 🧑‍💻 — we’ve made it straightforward and fun! 🎉
          </li>
          <li>
            <strong>Download:</strong> When you're happy with your design,
            download the draft in just one click 🖱️. You can always go back to
            your work by uploading from your disc.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-4">🌟 Why Choose Us?</h2>
        <p className="text-lg mb-4">
          Out of all the tools available, ours combines ease-of-use with the
          flexibility and features you need to create complex, beautiful
          patterns 🎨. Whether you're designing a simple band or an intricate
          masterpiece, our tool helps you achieve it quickly and with minimal
          hassle 🧑‍🎨.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-4">🎉 Get Started Now</h2>
        <p className="text-lg mb-4">
          Ready to dive into the world of tablet weaving? Our handy tool will
          help you create unique patterns in no time ⏳. Try it out today and
          see why it's one of the best and most user-friendly tablet weaving
          tools online! 💡
        </p>
      </div>
    </div>
  );
};

const Manual = () => {
  return <PageFrame {...{Main}} />;
};

export default Manual;
