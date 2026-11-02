"use client";
import {
    AwaitedPageProps,
    MultiStepFormEnum,
    MultiStepsFormComponentProps,
} from "@/config/types";
import { ArrowRightIcon, CircleCheck, CircleCheckIcon, CreditCardIcon, Loader2, LockIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import Image from "next/image";
import HtmlParser from "../shared/htmlParser";
import { Button } from "../ui/button";
const Welcome = (props: MultiStepsFormComponentProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const nextStep = () => {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const url = new URL(window.location.href);
            url.searchParams.set("step", MultiStepFormEnum.SELECT_DATE.toString());
            router.push(url.toString());
        });
    };
    return <div className="mx-auto bg-white rounded-b-lg shadow-lg">
        <div className="p-6">
                <div className="flex gap-x-12 justify-between">
                        <div className="flex-1">
                             <div className="flex items-start mb-4">
                                 <CircleCheckIcon className="text-[#FFC400] w-6 h-6 mr-2" />
                                <p className="text-[#53657A]">
                                        Snag your dream ride in just 2 fire moves! 🔥
                                </p>
                             </div>
                             <div className="flex items-start mb-4">
                                 <CircleCheckIcon className="text-[#FFC400] w-6 h-6 mr-2" />
                                <p className="text-[#53657A]">
                                        Pick your vibe and lock in that handover date! 💯
                                </p>
                             </div>
                        </div>
                        <div className="flex flex-1 space-x-2">
                                <div className="relative w-16 h-16">
                                        <Image 
                                                src={props.car.make.image}
                                                alt={props.car.make.name}
                                                className="aspect-1/1 object-contain"
                                                height={100}
                                                width={100}
                                        />
                                </div>
                                <div className="flex-1">
                                        <h2 className="text-lg font-semibold line-clamp-1">
                                                {props.car.title}
                                        </h2>
                                        <div className="text-xs line-clamp-2">
                                                <HtmlParser 
                                                        html={props.car.description || ""}
                                                        
                                                />
                                        </div>
                                </div>
                        </div>
                </div>
                <div className="flex justify-around items-center bg-[#F3F6FA] p-4 rounded-md mb-4">
                        <div className="text-center">
                                <p className="font-bold">Pick Your Handover Moment ⚡</p>
                                <p className="text-[#53657A]">literally takes 60 seconds</p>

                        </div>
                        <ArrowRightIcon className="w-6 h-6" />
                        <div className="text-center">
                                <p className="font-bold">Drop Your Deets 📝</p>
                                <p className="text-[#53657A]">another quick minute</p>
                        </div>
                </div>
                <p className="font-bold mb-4 text-[#062A5E]">
                        Ready to Drive Your Dreams Today with Confidence? 🚗💨
                </p>
                <div className="flex justify-around items-center">
                        <div className="flex items-center flex-col justify-center space-y-2">
                                <LockIcon className="w-6 h-6 text-[#062A5E]"/>
                                <p className="text-[#53657A]">Fort Knox Level</p>
                        </div>
                        <div className="flex items-center flex-col justify-center space-y-2">
                                <StarIcon className="w-6 h-6 text-[#FFC400]"/>
                                <p className="text-[#53657A]">5-Star Vibes</p>

                        </div>
                        <div className="flex items-center flex-col justify-center space-y-2">
                                <CreditCardIcon className="w-6 h-6 text-[#062A5E]"/>
                                <p className="text-[#53657A]">Smooth Payments</p>

                        </div>
                </div>
        </div>
        <div className="p-6">
                <Button
                        type="button"
                        onClick={nextStep}
                        disabled={isPending}
                        className="uppercase font-bold flex gap-x-3 w-full"
                >
                        {isPending ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" />: null}
                        {' '} LET'S GOOO! 🎯
                </Button>
        </div>
    </div>;
};

export default Welcome;
