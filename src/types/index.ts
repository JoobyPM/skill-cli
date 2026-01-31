export interface Skill {
  name: string;
  description: string;
  capabilities: string[];
  examples: string[];
}

export interface SkillConfig {
  version: string;
  skills: Skill[];
}

export interface CommandOptions {
  verbose?: boolean;
  force?: boolean;
}
