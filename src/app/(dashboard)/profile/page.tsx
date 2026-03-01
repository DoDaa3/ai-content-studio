'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { PageTransition } from '@/components/ui/page-transition';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/providers/auth-provider';
import { useGenerationStats } from '@/hooks/use-generations';
import { createClient } from '@/lib/supabase/client';
import { formatDate, getContentTypeLabel } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: stats } = useGenerationStats();
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || ''
  );
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile updated');
    }
    setSaving(false);
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile card */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-white text-2xl font-bold">
              {(
                user?.user_metadata?.full_name?.[0] ||
                user?.email?.[0] ||
                'U'
              ).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {user?.user_metadata?.full_name || 'User'}
              </h2>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {user?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-9 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
              <Input
                label="Full Name"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-9 h-4 w-4 text-text-secondary-light dark:text-text-secondary-dark" />
              <Input
                label="Email"
                id="email"
                value={user?.email || ''}
                disabled
                className="pl-10 opacity-60"
              />
            </div>

            <Button type="submit" loading={saving}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Account info */}
        <Card>
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <Calendar className="h-4 w-4" />
                Member since
              </div>
              <span className="text-sm font-medium">
                {user?.created_at ? formatDate(user.created_at) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Total generations
              </span>
              <span className="text-sm font-medium">{stats?.total || 0}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Most used type
              </span>
              <span className="text-sm font-medium">
                {stats?.mostUsedType
                  ? getContentTypeLabel(stats.mostUsedType.type)
                  : '—'}
              </span>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <h3 className="font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                Choose your preferred color scheme
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-red-500/20">
            <h3 className="font-semibold text-red-500 mb-2">Danger Zone</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Once you delete your account, there is no going back.
            </p>
            <Button variant="danger" size="sm" disabled>
              Delete Account
            </Button>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
