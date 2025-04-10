import React from "react";

function Date_now() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let currentHour = currentDate.getHours();
  

  return (
    <>
      <div className="flex flex-col mt-3 py-3">
        <h1 className="text-5xl text-amber-300 ">
          <div>
            {(() => {
              if (currentHour < 12) {
                return <h1 className="font-serif">Good Morning!!</h1>;
              } else if (currentHour < 18) {
                return <h1>Good Afternoon!!</h1>;
              } else {
                return <h1 className="font-serif">Good Evening!!</h1>;
              } 
            })()}
          </div>
        </h1>
        <div className="text-2xl text-amber-50 ">{formattedDate}</div>
      </div>
    </>
  );
}

export default Date_now;
