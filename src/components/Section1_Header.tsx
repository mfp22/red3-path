import React from "react";
import Hero from "./UI/Hero";
import HeroInfo from "./UI/HeroInfo";

export function Section1_Header() {
    return (
        <div className="col-span-full my-0 md:my-4 lg:my-0 hidden sm:grid auto-cols-fr">
            {/* Hero and instructions */}
            <Hero className="h-12 md:h-16 text-primary-900 opacity-75 md:opacity-50" />
            <HeroInfo className="text-sm md:text-lg text-primary-100 opacity-90" />
        </div>
    );
}
