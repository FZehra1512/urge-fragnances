import React, { useEffect, useState } from "react";
import gsap from "gsap";
import "./navbar.css"

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const scentDiv = document.querySelector(".scent-div");
    const candleDiv = document.querySelector(".candle-div");
    const fragnanceDiv = document.querySelector(".fragnance-div");
    const listItem1 = document.getElementById("li-1");
    const listItem2 = document.getElementById("li-2");
    const listItem3 = document.getElementById("li-3");

    const showDiv = (div, itemId) => {
      gsap.to(div, {
        width: "100%",
        display: "block",
        opacity: 1,
        duration: 0.2,

      });
      setActiveItem(itemId);
    };

    const hideDiv = (div, itemId) => {
      gsap.to(div, {
        width: "0%",
        display: "none",
        opacity: 0,
        duration: 0.2,
      });
      // Only unset activeItem if it's still the current item.
      setActiveItem((prev) => (prev === itemId ? null : prev));
    };

    const addHoverEffect = (listItem, div, itemId) => {
      const onMouseEnter = () => showDiv(div, itemId);
      const onMouseLeave = (e) => {
        const relatedTarget = e.relatedTarget;
        if (!listItem.contains(relatedTarget) && !div.contains(relatedTarget)) {
          hideDiv(div, itemId);
        }
      };

      listItem.addEventListener("mouseenter", onMouseEnter);
      listItem.addEventListener("mouseleave", onMouseLeave);
      div.addEventListener("mouseenter", onMouseEnter);
      div.addEventListener("mouseleave", onMouseLeave);

      // Cleanup listeners
      return () => {
        listItem.removeEventListener("mouseenter", onMouseEnter);
        listItem.removeEventListener("mouseleave", onMouseLeave);
        div.removeEventListener("mouseenter", onMouseEnter);
        div.removeEventListener("mouseleave", onMouseLeave);
      };
    };

    const cleanup1 = addHoverEffect(listItem1, scentDiv, "li-1");
    const cleanup2 = addHoverEffect(listItem2, candleDiv, "li-2");
    const cleanup3 = addHoverEffect(listItem3, fragnanceDiv, "li-3");

    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
    };
  }, []);

  return (
    <>
      <div className="p-10 flex gap-40 items-center">
        <div className="logo text-4xl font-bold">Urge Fragnances</div>
        <div className="list">
          <ul className="text-3xl flex gap-10">
            <li
              className={`cursor-pointer relative group ${activeItem === "li-1" ? "active" : ""
                }`}
              id="li-1"
            >
              Scents
              <span className="absolute bottom-[-10px] left-0 w-0 h-[5px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
            <li
              className={`cursor-pointer relative group ${activeItem === "li-2" ? "active" : ""
                }`}
              id="li-2"
            >
              Candles
              <span className="absolute bottom-[-10px] left-0 w-0 h-[5px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
            <li
              className={`cursor-pointer relative group ${activeItem === "li-3" ? "active" : ""
                }`}
              id="li-3"
            >
              Fragrances
              <span className="absolute bottom-[-10px] left-0 w-0 h-[5px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-10 absolute z-2 top-20 w-0 hidden scent-div h-64">
        <ul className="text-2xl flex gap-10 items-center">
          <li className="cursor-pointer">
            link 1 of Scents
          </li>
          <li className="cursor-pointer">link 2</li>
          <li className="cursor-pointer">link 3</li>
        </ul>
      </div>
      <div className="p-10 absolute z-2 top-20 w-0 hidden candle-div h-64">
        <ul className="text-2xl flex gap-10 items-center">
          <li className="cursor-pointer">
            link 1 of Candle
          </li>
          <li className="cursor-pointer">link 2</li>
          <li className="cursor-pointer">link 3</li>
        </ul>
      </div>
      <div className="p-10 absolute z-2 top-20 w-0 hidden fragnance-div h-64">
        <ul className="text-2xl flex gap-10 items-center">
          <li className="cursor-pointer">
            link 1 of Fragnances
          </li>
          <li className="cursor-pointer">link 2</li>
          <li className="cursor-pointer">link 3</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
