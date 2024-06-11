const Loader = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <img
        src="/assets/spinner.gif"
        className="h-[70px] w-[70px]"
        alt="loading"
      />
    </div>
  );
};

export default Loader;
