export type Group = {
  id: string;
  created_at?: string;
  created_by: string;
  name: string;
};

export type UserGroupRow = {
    group: Group;
}