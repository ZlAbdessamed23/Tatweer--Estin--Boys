

const Globe = () => {

  return (
    <div className=" h-screen w-screen">
 
      
      <video
   
        preload="auto" // Ensures video is preloaded to avoid delay
        autoPlay
        loop
        muted
        playsInline
        className="h-full  w-full object-cover"
      
      >
        <source src="/globe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Globe;
