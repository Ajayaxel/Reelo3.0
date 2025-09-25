interface AuthLayoutProps {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return ( 
    <div className="relative h-full w-full flex flex-col overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/4024-176369946_medium.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,.4),rgba(0,0,0,.8))] z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        <div className="h-full w-full md:h-auto md:w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

