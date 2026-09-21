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
        whatsapp:"https://wa.me/201021219445",
        img: "",
    },
    {
        id: 9,
        name: "Hla Elmassri",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/eng.hlaelmassri/",
        facebook: "https://www.facebook.com/hla.elmassri/",
        linkedin: "https://www.linkedin.com/in/hla-elmassri-065940386/",
        github: "https://github.com/Hla-Elmassri",
        whatsapp: "https://wa.me/201098362708",
        img: "/team/hlaelmassri.jpeg",
    },
    {
        id: 10,
        name: "Mohammed samir Ebrahim",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/muhamed_sameerr?stkn=MWpqaDBpbTgwdmM4Mg%3D%3D",
        facebook: "https://www.facebook.com/mohamed.samir.taher?rdid=4FEa7E535TzbqJst&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1d1JWXoTKy%2F#",
        linkedin: "https://www.linkedin.com/in/mohamed-sameer-04b062275/",
        github: "https://github.com/Mohame570",
        whatsapp: "https://wa.me/201027052903",
        img: "/team/mohammedsamir.jpeg",
    },
    {
        id: 11,
        name: "Tasneem Ayman",
        role: "Developer",
        website: "",
        instagram: "https://www.instagram.com/tasneem__ayman_/",
        facebook: "https://www.facebook.com/tasneem.ayman.520?rdid=ki8VxV5v1pNDe8Yr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19WzuyVsDq%2F#",
        linkedin: "https://www.linkedin.com/in/tasneem-ayman-7212882a3/",
        github: "https://github.com/Tasneemayman249",
        whatsapp: "https://wa.me/201063463899",
        img: "/team/tasneemayman.jpg",
    },
    {
        id: 12,
        name: "Esraa Ehab",
        role: "Developer",
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "https://www.linkedin.com/in/esraa-e-ba124a222/",
        github: "https://github.com/esraa-ehab103",
        whatsapp: "https://wa.me/201148717813",
        img: "",
    },

];

export default function Team() {
    const memberCount = team.length;
    const linkedCount = team.filter((member) => member.github).length;

    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border bg-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                        Our Team
                    </p>

                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                        Meet the <span className="text-primary">Koda Store</span> Team
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                        A team of talented people working together to build,
                        create, and deliver great results.
                    </p>

                    <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-border bg-background/60 px-5 py-4 backdrop-blur">
                            <p className="text-3xl font-black text-primary">{memberCount}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Team Members
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-background/60 px-5 py-4 backdrop-blur">
                            <p className="text-3xl font-black text-primary">{linkedCount}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                On GitHub
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {team.map((member) => (
                    <div
                        key={member.id}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                    >

                        {/* Image */}
                        <div className="mx-auto mb-4 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-muted bg-muted shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                            {member.img ? (
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="h-full w-full object-cover transition-transform object-top duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                                    {member.name?.charAt(0) || "?"}
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <h2 className="text-lg font-bold text-foreground">
                            {member.name}
                        </h2>

                        {/* Role */}
                        {member.role && (
                            <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {member.role}
                            </span>
                        )}

                        {/* Social Links */}
                        <div className="mt-5 flex justify-center gap-3">
                            {member.website && (
                                <a
                                    href={member.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} website`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
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
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-pink-500 hover:text-white"
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
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-blue-600 hover:text-white"
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
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-blue-700 hover:text-white"
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
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
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
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-green-500 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
