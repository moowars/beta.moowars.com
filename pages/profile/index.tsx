import BuyIcon from "@components/profile/BuyIcon";
import HomeIcon from "@components/profile/HomeIcon";
import MainLayout from "@layouts/MainLayout";
import { useMetamask } from "@lib/metamask/useMetamask";
import Head from "next/head";
import React from "react";
import { moowars } from "@utils/moowars";
import { MooType } from "types/MooType";
import Button from "@components/mint/Button";

type Props = {};

const Profile = (props: Props) => {
  const [loggedIn, setLoginDialogOpen] = useMetamask((state) => [
    state.accountId !== null,
    state.setLoginPromptOpen,
  ]);
  const [mooCollection, setMooCollection] = React.useState<MooType[]>([]);

  React.useEffect(() => {
    setMooCollection(
      moowars.mooCollection.collection
        // Sort collection by id in ascending order
        .sort((a: MooType, b: MooType) => Number(a.id) - Number(b.id))
    );

    moowars.mooCollection.on("load", (tokenIds: MooType[]) => {
      setMooCollection([...tokenIds]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>MooWars - Profile</title>
      </Head>

      <MainLayout siteTitle="Profile" bgColorClass="bg-offwhite">
        {!loggedIn ? (
          <div className="w-full h-full flex flex-grow flex-col items-center mt-28">
            <h1 className="text-4xl font-lexend-deca max-w-xl text-center">
              Please sign in with Metamask to view your profile.
            </h1>
            <Button
              className="p-4 py-2 mt-8 font-lexend-exa tracking-tighter"
              onClick={() => setLoginDialogOpen(true)}
            >
              Sign In
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-start py-3 space-x-5">
              <div className="flex items-center justify-center space-x-1">
                <HomeIcon />
                <p className="font-lexend-exa text-sm leading-[17.5px] tracking-tighter text-light-green">
                  Home
                </p>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <BuyIcon />
                <p className="font-lexend-exa text-sm leading-[17.5px] tracking-tighter">
                  Home
                </p>
              </div>
            </div>
            <div className="border-y-[1px] border-y-maroon h-[4px] w-full md:w-[1280px] mx-auto" />
            <p className="mt-4 font-lexend-exa tracking-tighter max-w-2xl text-sm text-maroon">
              Disclaimer: Profile display is a work in progress. This page is
              subject to change.
            </p>
            <div className="pt-[26px]">
              {/* Profile Info */}
              <div
                className="w-[1280px] flex rounded-[5px] h-[101px] px-[27.95px] py-[14.25px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(206, 255, 231, 0.1) 0%, rgba(206, 255, 231, 0.05) 100%)",
                  boxShadow:
                    "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
                  backdropFilter: "blur(5px)",
                }}
              >
                {/* Metamask Number */}
                <div>
                  <p className="font-lexend-exa text-[10px] leading-[12.5px] tracking-tighter uppercase font-bold text-[#4E928E]">
                    Metamask #
                  </p>
                  <p className="font-cinder text-[56px] leading-[67.2px]">
                    {moowars.account.slice(0, 6) +
                      "..." +
                      moowars.account.slice(-4)}
                  </p>
                </div>

                {/* Date Joined Moowars */}

                {/* Card Count */}

                {/* Disconnect Wallet Button */}
              </div>

              <ul className="flex flex-wrap py-4 gap-4">
                {mooCollection.map((moo) => (
                  <li
                    className="rounded-md p-5"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(206, 255, 231, 0.1) 0%, rgba(206, 255, 231, 0.05) 100%)",
                      boxShadow:
                        "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 9px 14px -10px rgba(232, 255, 249, 0.25)",
                      backdropFilter: "blur(5px)",
                    }}
                    key={moo.id}
                  >
                    <p className="font-bold font-lexend-exa tracking-tighter uppercase">
                      Moo #{moo.id}
                    </p>
                    <img
                      src={moo.image()}
                      alt={`Image of Moo ${moo.id}.`}
                      className="object-cover rounded w-40 aspect-square my-2"
                    />
                    <p className="font-lexend-exa tracking-[-.8px]">
                      Power Level: {moo.powerLevel}
                    </p>
                    <p className="font-lexend-exa tracking-[-.8px]">
                      Hit Points: {moo.hitPoints}
                    </p>
                    <p className="font-lexend-exa tracking-[-.8px]">
                      Attack: {moo.attack}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Profile;
