
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

interface UserManagementTabProps {
  users: any[];
  onAssignRole: (userId: string, role: string) => void;
}

const UserManagementTab = ({ users, onAssignRole }: UserManagementTabProps) => {
  return (
    <Card className="border-[#8B4513]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#8B4513]">User Management</CardTitle>
        <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.user_roles?.map((roleObj: any, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {roleObj.role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <select 
                      onChange={(e) => onAssignRole(user.id, e.target.value)}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="">Assign Role</option>
                      <option value="pastor">Pastor</option>
                      <option value="trustee">Trustee</option>
                      <option value="deacon">Deacon</option>
                      <option value="music_director">Music Director</option>
                      <option value="media_director">Media Director</option>
                    </select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;
