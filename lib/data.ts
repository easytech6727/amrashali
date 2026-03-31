import { createServerSupabaseClient } from "@/lib/supabaseClient";
import type {
  Article,
  Project,
  Service,
  CVData,
  CVContact,
  CVEducation,
  CVExperience,
  CVCommunityWork,
  CVSkill,
  CVLanguage,
  CVCertification,
  OwnerProfile,
} from "@/types/journal";

// Re-export types so existing imports from "@/lib/data" keep working
export type { Article, Project, Service };
export type Education = CVEducation;
export type Experience = CVExperience;
export type CommunityWork = CVCommunityWork;
export type Skill = CVSkill;
export type Language = CVLanguage;
export type Certification = CVCertification;
export type { CVData, OwnerProfile };

// ─── Articles ────────────────────────────────────────────────

export async function getAllArticles(): Promise<Article[]> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) {
    console.error("getAllArticles error:", error.message);
    return [];
  }
  return data as Article[];
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Article;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })
    .limit(3);
  if (error) {
    console.error("getFeaturedArticles error:", error.message);
    return [];
  }
  return data as Article[];
}

export async function getCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  const cats = new Set<string>();
  articles.forEach((a) => {
    if (a.category) cats.add(a.category);
  });
  return Array.from(cats).sort();
}

export async function getTags(): Promise<string[]> {
  const articles = await getAllArticles();
  const tags = new Set<string>();
  articles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

// ─── Projects ────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) {
    console.error("getAllProjects error:", error.message);
    return [];
  }
  return data as Project[];
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Project;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("date", { ascending: false });
  if (error) {
    console.error("getFeaturedProjects error:", error.message);
    return [];
  }
  return data as Project[];
}

// ─── Services ────────────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  const sb = createServerSupabaseClient();
  const { data, error } = await sb
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
  return data as Service[];
}

// ─── CV Data ────────────────────────────────────────────────

export async function getCVData(): Promise<CVData> {
  const sb = createServerSupabaseClient();

  const [contactRes, langRes, eduRes, expRes, cwRes, skillRes, certRes] =
    await Promise.all([
      sb.from("cv_contact").select("*").limit(1).single(),
      sb.from("cv_languages").select("*").order("sort_order"),
      sb.from("cv_education").select("*").order("sort_order"),
      sb.from("cv_experience").select("*").order("sort_order"),
      sb.from("cv_community_work").select("*").order("sort_order"),
      sb.from("cv_skills").select("*").order("sort_order"),
      sb.from("cv_certifications").select("*").order("sort_order"),
    ]);

  return {
    contact: (contactRes.data as CVContact) || {
      id: "",
      phone: "",
      email: "",
      address: "",
    },
    languages: (langRes.data as CVLanguage[]) || [],
    education: (eduRes.data as CVEducation[]) || [],
    experience: (expRes.data as CVExperience[]) || [],
    communityWork: (cwRes.data as CVCommunityWork[]) || [],
    skills: (skillRes.data as CVSkill[]) || [],
    certifications: (certRes.data as CVCertification[]) || [],
  };
}

// ─── Owner profile (journal owner – professional info only) ─────

export async function getOwnerProfile(): Promise<OwnerProfile> {
  return {
    name: "Mohamed Hakeem Mohamed Amras Ali",
    role: "Founder & Editor-in-Chief",
    bio: `I am Amras Ali, an undergraduate in social work at the National Institute of Social Development, driven by a deep commitment to social insight, critical thinking, and purposeful impact. My work is grounded in understanding the complexities of society while exploring meaningful pathways for change.\n\nAB Journal reflects my vision to create a thoughtful and influential platform that goes beyond conventional content. It is a space dedicated to ideas that matter, perspectives that challenge, and narratives that connect people to real social experiences. Through this platform, I aim to present knowledge in a way that is both reflective and relevant to contemporary society.\n\nMy journey is shaped by a strong interest in community engagement, social innovation, and youth-led initiatives. I believe in the power of informed voices, ethical leadership, and consistent action to shape a more conscious and inclusive future.\n\nAB Journal stands as an extension of that belief — a platform built not just to share, but to influence, inspire, and leave a lasting impact.`,
    imageUrl: "/ab-journal/profile-removebg-preview.jpeg",
    imageAlt: "Author profile",
    backgroundImageUrl: "/ab-journal/background%20image.jpeg",
  };
}

