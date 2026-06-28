// Temporary dummy data — Day 3 will replace this with real API calls
// to the backend (see api/ directory once it exists)

export const departments = [
  {
    id: 1,
    name: "School of Scaring",
    description:
      "MU's flagship program, training the next generation of top scarers. Home to the legendary Scare Games.",
    bannerImage: "https://placehold.co/600x300?text=School+of+Scaring",
    contactInfo: "scaring@mu.edu",
  },
  {
    id: 2,
    name: "Department of Athletics",
    description:
      "Keeping monsters in peak physical condition for the rigors of scaring. Go Scarers!",
    bannerImage: "https://placehold.co/600x300?text=Athletics",
    contactInfo: "athletics@mu.edu",
  },
  {
    id: 3,
    name: "School of Comedy",
    description:
      "For monsters who'd rather make kids laugh than scream. Smaller program, bigger personalities.",
    bannerImage: "https://placehold.co/600x300?text=School+of+Comedy",
    contactInfo: "comedy@mu.edu",
  },
];

export const faculty = [
  {
    id: 1,
    name: "Dean Hardscrabble",
    bio: "A legendary scarer in her own right, Dean Hardscrabble runs the School of Scaring with terrifying precision and even higher standards.",
    profileImage: "https://placehold.co/300x300?text=Hardscrabble",
    contactInfo: "hardscrabble@mu.edu",
    departmentId: 1,
  },
  {
    id: 2,
    name: "Professor Knight",
    bio: "Teaches Scare Tactics 101. Known for his no-nonsense approach and his pet snake assistant teacher, Carrie.",
    profileImage: "https://placehold.co/300x300?text=Prof+Knight",
    contactInfo: "knight@mu.edu",
    departmentId: 1,
  },
  {
    id: 3,
    name: "Professor Brandywine",
    bio: "Specializes in History of Scaring. Has been teaching at MU longer than anyone can remember.",
    profileImage: "https://placehold.co/300x300?text=Brandywine",
    contactInfo: "brandywine@mu.edu",
    departmentId: 1,
  },
  {
    id: 4,
    name: "Coach Rip",
    bio: "Head coach of the MU athletics program. Believes every monster has a sport waiting for them.",
    profileImage: "https://placehold.co/300x300?text=Coach+Rip",
    contactInfo: "rip@mu.edu",
    departmentId: 2,
  },
  {
    id: 5,
    name: "Professor Derek",
    bio: "Teaches Intro to Comedy. His pun-based curriculum is either beloved or despised — there's no in-between.",
    profileImage: "https://placehold.co/300x300?text=Prof+Derek",
    contactInfo: "derek@mu.edu",
    departmentId: 3,
  },
];
