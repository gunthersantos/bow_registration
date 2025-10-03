import { Card } from './ui/Card'
import { Shield, User } from 'lucide-react'
import { UserType } from '../App'

interface ProfileProps {
  userType: UserType;
  userInfo: any;
}

export function Profile({ userType, userInfo }: ProfileProps) {
  return (
    <section className="max-w-xl mx-auto px-4 mt-12">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          {userType === "student" ? <User size={32} className="text-bow-indigo" /> : <Shield size={32} className="text-bow-indigo" />}
          <h2 className="text-2xl font-bold text-bow-indigo">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Name:</span> {userInfo?.firstName} {userInfo?.lastName}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Username:</span> {userInfo?.username}
          </div>
          {userType === "student" && (
            <>
              <div>
                <span className="font-semibold text-gray-700">Student ID:</span> {userInfo?.studentId}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Program:</span> {userInfo?.program?.name} ({userInfo?.program?.type})
              </div>
              <div>
                <span className="font-semibold text-gray-700">Department:</span> Software Development (SD)
              </div>
            </>
          )}
          <div>
            <span className="font-semibold text-gray-700">Status:</span> {userType === "student" ? "Student" : "Admin"}
          </div>
        </div>
      </Card>
    </section>
  );
}