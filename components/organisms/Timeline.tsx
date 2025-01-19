import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../molecules/SkillDataProvider";
import SkillText from "../molecules/SkillText";
import ChecklistTimeline from "../molecules/ChecklistTimeline";
import TimelineCard from "../atoms/TimelineCard";

const Timeline = () => {
  return (
    <section>
      <h1 className="text-[40px] lg:text-[50px] font-semibold text-center bg-clip-text bg-gradient-to-r text-transparent from-white via-[#00BBE0] to-[#00BBE0] py-10">
        Timeline
      </h1>
      <div
        className="space-y-8 relative before:absolute before:inset-0 before:ml-5
      before:-translate-x-px md:before:mx-auto md:before:translate-x-0
      before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent
      before:via-slate-300 before:to-transparent pr-6 pl-10 md:px-20"
      >
        {/* Item #1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <ChecklistTimeline />
          <TimelineCard
            date={"20/01/2025"}
            title={"Pembukaan Pendaftaran"}
            description={
              "Pendaftaran dibuka pada tanggal sampai 20 - 28 Januari 2025 pukul 23:59 WIB"
            }
          />
        </div>
        {/* Item #2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <ChecklistTimeline />
          <TimelineCard
            date={"01/02/2025"}
            title={"Wawancara"}
            description={
              "Sesi wawancara dilakukan semi-offline dan terdiri dari 2 tahap, yaitu wawancara inti dan wawancara dinas"
            }
          />
        </div>
        {/* Item #3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <ChecklistTimeline />
          <TimelineCard
            date={"02/02/2025"}
            title={"LGD"}
            description={
              "Leaderless Group Discussion dilakukan secara daring melalui media aplikasi Zoom"
            }
          />
        </div>
        {/* Item #4 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <ChecklistTimeline />
          <TimelineCard
            date={"04/02/2025"}
            title={"Pengumuman"}
            description={
              "Pengumuman disampaikan melalui grup whatsapp global oprec, dan akan dikirim ke email masing masing"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
