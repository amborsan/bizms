// import { useAuth } from "@clerk/react";
// import { Link, useNavigate } from "@tanstack/react-router";
import Grainient from "../../components/backgrounds/Grainient";
// import Button from "../../components/atoms/button/Button";

const teamMembers = [
  {
    name: "Feras Hifean",
    description: "Structures and planing devoloper.",
    githubLink: "https://github.com/Feras-tec",
    image: "https://avatars.githubusercontent.com/u/249945254?v=4",
  },
  {
    name: "I-Chieh Liu",
    description: "UI designer and devoloper.",
    githubLink: "https://github.com/i-chieh-liu-88",
    image: "https://avatars.githubusercontent.com/u/265013778?v=4",
  },
  {
    name: "Ali Borsan",
    description: "Code and Data devoloper.",
    githubLink: "https://github.com/amborsan",
    image: "https://avatars.githubusercontent.com/u/194240593?v=4",
  },
] as const;
const aboutCards = [
  {
    title: "Problem Statement",

    description: (
      <>
        <h3 className="text-l font-semibold text-base-content">
          Many small teams manage operations using scattered tools:
        </h3>
        <ul>
          <li>Spreadsheets for tasks</li>
          <li>Separate notes for customers</li>
          <li>Unstructured employee records</li>
          <h4>This causes:</h4>
          <li>Lost time</li>
          <li>Data inconsistency</li>
          <li>Difficult tracking of daily work</li>
          <li>
            BizMS solves this by centralizing core operational data in one
            interface
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Project Goals",
    description: (
      <>
        <h3 className="text-l font-semibold text-base-content">
          Our goals were to:
        </h3>
        <ul>
          <li>Build a clear, easy-to-use dashboard </li>

          <li>Support CRUD workflows for key resources</li>
          <li> Implement smooth routing</li>
          <li>between list/detail/edit pages </li>
          <li> Keep the codebase modular and team-friendly</li>
        </ul>
      </>
    ),
  },
  {
    title: "Main Features",
    description: (
      <>
        <h3 className="text-l font-semibold text-base-content">Tasks</h3>
        <ul>
          <li>Task listing with search, filters, sorting, and pagination</li>
          <li>Task details and edit flow</li>
          <li> Admin actions for create/edit/delete</li>
        </ul>
        <h3 className="text-l font-semibold text-base-content"> Customers</h3>

        <li> Customer cards and details pages</li>
        <li>Edit and create customer workflows</li>

        <h2>Employees</h2>

        <li>Employee listing and details</li>
        <li> Edit and create employee workflows</li>
      </>
    ),
  },
  {
    title: "Tech Stack (Brief)",
    description: (
      <>
        <h3 className="text-l font-semibold text-base-content"> Tasks </h3>
        <ul>
          <li>Task listing with search, filters, sorting, and pagination </li>
          <li>Task details and edit flow </li>
          <li>Admin actions for create/edit/delete </li>
        </ul>
        <h3 className="text-l font-semibold text-base-content">Customers</h3>

        <li> Cust omer cards and details pages</li>
        <li> Edit and create customer workflows ### Employees </li>
        <li> Employee listing and details </li>
        <li> Edit and create employee workflows</li>
      </>
    ),
  },
] as const;

function AboutPage() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-10 lg:p-14">
      <div className="absolute inset-0">
        <Grainient
          color1="#ac9fff"
          color2="#000000"
          color3="#B497CF"
          timeSpeed={0.75}
          colorBalance={-0.1}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <div className="absolute inset-0 bg-base-100/80 backdrop-blur-[1px]" />
      <div className="absolute -right-28 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative space-y-12">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Business management system
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-base-content sm:text-5xl lg:text-3xl uppercase">
                Manage tasks, teams, and customers.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-base-content/70 sm:text-lg">
                A focused workspace for daily operations.
              </p>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          {aboutCards.map((card) => (
            <div key={card.title} className="card bg-base-100 shadow-xl">
              <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="mb-4 h-1.5 w-14 rounded-full bg-primary" />
                <h2 className="text-lg font-semibold text-base-content">
                  {card.title}
                </h2>
                <div className="mt-2 text-l leading-8 text-base-content/70">
                  {card.description}
                </div>
              </article>
            </div>
          ))}
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <div className="avatar online">
                  <div className="w-24 rounded-full">
                    <img src={member.image} alt="Team Member" />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{member.name}</h2>
                <p className="text-primary">{member.description}</p>
                <div className="card-actions justify-center mt-2">
                  <a
                    href={member.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://w3.org"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
