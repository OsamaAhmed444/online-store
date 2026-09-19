import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faLinkedin,
    faGithub,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const team = [
    {
        id: 1,
        name: "Adel Mohammed",
        role: "Developer",
        website: "https://adel-mhmd.vercel.app/",
        instagram: "https://www.instagram.com/adel.mhmd77/",
        facebook: "https://www.facebook.com/adel.mohammed.393460",
        linkedin: "https://www.linkedin.com/in/adel-mohammed-7122b33a3/",
        github: "https://github.com/adelmhmd77",
        whatsapp: "https://wa.me/201129142737",
        img: "/team/adelmohammed.jpeg",
    },

    {
        id: 2,
        name: "Gana Ragab",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/gana.ragab.16?stkn=dmJyajgycWZmdGow",
        facebook: "https://www.facebook.com/gogo.ragab.940?rdid=dsP6kOdD7zagqJiM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dck8N7Z4h%2F#",
        linkedin: "https://www.linkedin.com/in/gana-ragab-860b40412/",
        github: "https://github.com/ganaragab2169-del",
        whatsapp: "https://wa.me/201550040851",
        img: "/team/ganaragab.jpeg",
    },

    {
        id: 3,
        name: "Safaa Ahmed",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/safaa2000.ahmed?stkn=MTBrdXNjNnB3bXdjdg==",
        facebook: "https://www.facebook.com/share/1EgeZMKPAd/",
        linkedin: "https://www.linkedin.com/in/safaa-ahmed1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/safaaa2024",
        whatsapp: "https://wa.me/201060524376",
        img: "/team/safaahmed.jpeg",
    },
    {
        id: 4,
        name: "Ahmed Issa",
        role: "Developer",
        website: "",
        instagram: " https://www.instagram.com/ahmedissa.webdev/",
        facebook: "https://www.facebook.com/profile.php?id=100091553002278",
        linkedin: " https://www.linkedin.com/in/ahmed-issa-62665b400/",
        github: "https://github.com/dev-ahmedissa",
        whatsapp: "https://wa.me/972599013115",
        img: "/team/ahmedissa.jpeg",
    },
    {
        id: 5,
        name: "Osama Ahmed",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/n_iix_e7?stkn=bG11MW5pZzEycDhx",
        facebook: "https://www.facebook.com/share/1C44BJ3Mvo/",
        linkedin: "https://www.linkedin.com/in/osama-ahmed-a5b073385?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/OsamaAhmed444",
        whatsapp: "https://wa.me/201009262961",
        img: "/team/osamaahmed.jpeg",
    },
    {
        id: 6,
        name: "Mohamed Mohany",
        role: "Developer",
        website: "https://mohaamedmahany.github.io/My-Portfolio/",
        instagram: "https://www.instagram.com/mohany111?stkn=MWQzYXZwaTQ1MG1jbA==",
        facebook: "https://www.facebook.com/share/1PyufuqiuJ/",
        linkedin: "linkedin.com/in/mohamed-mahany-47b415342",
        github: "https://github.com/Mohaamedmahany",
        whatsapp: "https://wa.me/201125218188",
        img: "/team/mohamedmohany.jpeg",
    },
    {
        id: 7,
        name:"Ahmed Omran",
        website:"",
        instagram:"https://www.instagram.com/a7med.omran1?stkn=MXhodjBpZXFlbHVjbw==",
        facebook:"https://www.facebook.com/share/1THBzRRUYQ/",
        Linkedin:"https://www.linkedin.com/in/ahmed-omran-2a0313b3?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github:"https://github.com/Ahmedomran247",
        role: "Developer",
        whatsapp: "https://wa.me/971586937150",
        img: "/team/ahmedomran.jpeg",
    },
    {
        id: 8,
        name: "Manal fathi",
        role: "Developer",
        website:"https://glowing-frangollo-6e32cb.netlify.app/",
        instagram:"https://www.instagram.com/mana.llllll/?hl=en",
        facebook:"https://www.facebook.com/manal.fathy.756",
        linkedin:"https://www.linkedin.com/in/manal-fathi-a47676326/",
        github:"https://github.com/manalfathy620",
        whatsapp:"+201021219445",
        img: "",
    },
    {
        id: 9,
        name: "Esraa Ehab",
        role: "Developer",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "https://www.linkedin.com/in/esraa-e-ba124a222?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/esraa-ehab103",
        whatsapp: "+201148717813",
        img: "",
    },
    {
        id: 10,
        name: "Member Name",
        role: "Developer",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        github: "",
        whatsapp: "",
        img: "",
    },
    {
        id: 11,
        name: "Member Name",
        role: "Developer",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        github: "",
        whatsapp: "",
        img: "",
    },
    {
        id: 12,
        name: "Member Name",
        role: "Developer",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        github: "",
        whatsapp: "",
        img: "",
    },

];

export default function Team() {
    return (
        <section className="w-full py-16">
            {/* Header */}
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                    Our Team
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Meet Our Team
                </h1>

                <p className="mt-4 text-base leading-7 text-gray-500">
                    A team of talented people working together to build,
                    create, and deliver great results.
                </p>
            </div>

            {/* Team Grid */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {team.map((member) => (
                    <div
                        key={member.id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
                    >
                        {/* Top subtle decoration */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Image */}
                        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-100 bg-gray-100 shadow-sm transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-md">
                            {member.img ? (
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                                    {member.name?.charAt(0) || "?"}
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <h2 className="text-lg font-bold text-gray-900">
                            {member.name}
                        </h2>

                        {/* Role */}
                        {member.role && (
                            <p className="mt-1 text-sm text-gray-500">
                                {member.role}
                            </p>
                        )}

                        {/* Social Links */}
                        <div className="mt-5 flex justify-center gap-3">
                            {member.website && (
                                <a
                                    href={member.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} website`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-900 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faGlobe} />
                                </a>
                            )}

                            {member.instagram && (
                                <a
                                    href={member.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} Instagram`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-pink-500 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            )}

                            {member.facebook && (
                                <a
                                    href={member.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} Facebook`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            )}

                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} LinkedIn`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-blue-700 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            )}

                            {member.github && (
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} GitHub`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-black hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            )}

                            {member.whatsapp && (
                                <a
                                    href={member.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} WhatsApp`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-green-500 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
