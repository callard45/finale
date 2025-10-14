import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
import { BellIcon, ChevronRightIcon, GlobeIcon, KeyIcon, LogOutIcon, MailIcon, PaintbrushIcon as PaintBrushIcon, ShieldIcon, UserIcon } from "lucide-react";

export const SettingsSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    displayName: "Sarah",
    email: "sarah.johnson@genkreer.com",
    bio: "Career coach with 5 years of experience helping students find their dream jobs. Specialized in tech and business placements.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: false,
    student_updates: true,
    weekly_summary: true,
    analytics_report: false,
  });

  const [activeTheme, setActiveTheme] = useState("light");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({ 
      ...prev, 
      [setting]: !prev[setting as keyof typeof prev] 
    }));
    console.log(`Toggled ${setting} notification setting`);
  };

  const handleThemeChange = (theme: string) => {
    console.log(`Changed theme to: ${theme}`);
    setActiveTheme(theme);
    // In a real app, this would update the application theme
  };

  const handleSaveChanges = () => {
    console.log("Saving account changes:", formData);
    alert("Account information updated successfully!");
  };

  const handleSavePreferences = () => {
    console.log("Saving notification preferences:", notificationSettings);
    alert("Notification preferences saved successfully!");
  };

  const handleUpdatePassword = () => {
    console.log("Password update requested");
    alert("Password updated successfully!");
  };

  const handleEnable2FA = () => {
    console.log("Enabling 2FA");
    alert("Two-factor authentication setup initiated. Please check your email for further instructions.");
  };

  const handleSignOutAll = () => {
    if (window.confirm("Are you sure you want to sign out from all devices?")) {
      console.log("Signing out from all devices");
      alert("You have been signed out from all devices.");
    }
  };

  const handleConnectIntegration = (integration: string) => {
    console.log(`Connecting to ${integration}`);
    alert(`${integration} integration initiated. You will be redirected to authorize access.`);
  };

  const handleDisconnectIntegration = (integration: string) => {
    if (window.confirm(`Are you sure you want to disconnect ${integration}?`)) {
      console.log(`Disconnecting from ${integration}`);
      alert(`${integration} has been disconnected.`);
    }
  };

  const handleExportData = (dataType: string) => {
    console.log(`Exporting ${dataType} data`);
    alert(`Your ${dataType} data export has started. You will receive a download link by email.`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
      alert("Account deletion process initiated. You will receive confirmation by email.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User logged out");
      window.location.href = "/login";
    }
  };

  const handleAvatarChange = () => {
    console.log("Avatar change requested");
    alert("Avatar upload feature initiated. Please select an image file.");
    // In a real app, this would open a file picker
  };

  // Settings navigation items
  const settingsTabs = [
    { id: "account", label: "Account", icon: <UserIcon className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <KeyIcon className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon className="w-5 h-5" /> },
    { id: "appearance", label: "Appearance", icon: <PaintBrushIcon className="w-5 h-5" /> },
    { id: "integrations", label: "Integrations", icon: <GlobeIcon className="w-5 h-5" /> },
    { id: "privacy", label: "Privacy", icon: <ShieldIcon className="w-5 h-5" /> },
  ];

  // Notification settings
  const notificationSettingsList = [
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive emails about student activity, updates, and system alerts",
      enabled: notificationSettings.email,
    },
    {
      id: "browser",
      title: "Browser Notifications",
      description: "Receive notifications in your browser when students complete tasks",
      enabled: notificationSettings.browser,
    },
    {
      id: "student_updates",
      title: "Student Updates",
      description: "Get notified when students update their profiles or generate new documents",
      enabled: notificationSettings.student_updates,
    },
    {
      id: "weekly_summary",
      title: "Weekly Summary",
      description: "Receive a weekly summary of student activity and progress",
      enabled: notificationSettings.weekly_summary,
    },
    {
      id: "analytics_report",
      title: "Analytics Reports",
      description: "Get monthly analytics reports about student progress and metrics",
      enabled: notificationSettings.analytics_report,
    },
  ];

  // Integrations
  const integrations = [
    {
      name: "LinkedIn",
      status: "Connected",
      lastSync: "May 15, 2025",
      icon: "/linkedin-icon.png",
    },
    {
      name: "Google Calendar",
      status: "Connected",
      lastSync: "May 20, 2025",
      icon: "/google-calendar-icon.png",
    },
    {
      name: "Microsoft Teams",
      status: "Not connected",
      icon: "/microsoft-teams-icon.png",
    },
    {
      name: "Slack",
      status: "Not connected",
      icon: "/slack-icon.png",
    },
  ];

  // Theme options
  const themeOptions = [
    {
      name: "Light",
      value: "light",
      description: "Clean, bright appearance",
      selected: activeTheme === "light",
    },
    {
      name: "Dark",
      value: "dark",
      description: "Easier on the eyes in low light",
      selected: activeTheme === "dark",
    },
    {
      name: "System",
      value: "system",
      description: "Follow your system preferences",
      selected: activeTheme === "system",
    },
  ];

  return (
    <div className="flex flex-1 p-8">
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 mt-1">
            Manage your account settings and preferences
          </p>
        </header>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <nav className="w-64 flex-shrink-0">
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  {settingsTabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className={`justify-start h-11 px-3 rounded-lg ${
                        activeTab === tab.id
                          ? "bg-[#3b82f610] text-blue-500"
                          : "text-slate-800"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      <span className="ml-3 font-medium">{tab.label}</span>
                    </Button>
                  ))}

                  <Separator className="my-2" />

                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 h-11 px-3 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span className="ml-3 font-medium">Log out</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </nav>

          {/* Settings Content */}
          <div className="flex-1">
            <Card className="w-full">
              <CardContent className="p-6">
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-6">
                        Account Settings
                      </h2>
                      <div className="flex items-center gap-4 mb-8">
                        <Avatar className="w-24 h-24 bg-gradient-to-br from-[rgba(139,92,246,1)] to-[rgba(124,58,237,1)]">
                          <AvatarFallback className="text-white text-2xl">SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleAvatarChange}
                          >
                            Change Avatar
                          </Button>
                          <p className="text-sm text-slate-500 mt-1">
                            JPG, GIF or PNG. Max size 2MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="fullName"
                          className="text-sm font-medium text-slate-700"
                        >
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="displayName"
                          className="text-sm font-medium text-slate-700"
                        >
                          Display Name
                        </label>
                        <Input
                          id="displayName"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-700"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="role"
                          className="text-sm font-medium text-slate-700"
                        >
                          Role
                        </label>
                        <Input
                          id="role"
                          defaultValue="Career Coach"
                          className="h-12"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium text-slate-700"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Notification Preferences
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Manage how you receive notifications from GenKreer Coach
                      </p>
                    </div>

                    <div className="space-y-6">
                      {notificationSettingsList.map((setting) => (
                        <div
                          key={setting.id}
                          className="flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <h3 className="font-medium text-slate-800">
                              {setting.title}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {setting.description}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={setting.enabled}
                              onChange={() => handleNotificationToggle(setting.id)}
                            />
                            <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSavePreferences}
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Security Settings
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Manage your password and account security
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Change Password</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-1">
                            <label
                              htmlFor="currentPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              Current Password
                            </label>
                            <Input
                              id="currentPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="newPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              New Password
                            </label>
                            <Input
                              id="newPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="confirmPassword"
                              className="text-sm font-medium text-slate-700"
                            >
                              Confirm New Password
                            </label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="h-12"
                            />
                          </div>
                        </div>
                        <Button 
                          className="mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={handleUpdatePassword}
                        >
                          Update Password
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={handleEnable2FA}
                        >
                          Enable 2FA
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium text-slate-800">Login Sessions</h3>
                        <p className="text-sm text-slate-500">
                          Manage your active sessions and sign out from other devices.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-2 text-red-500 border-red-300 hover:bg-red-50"
                          onClick={handleSignOutAll}
                        >
                          Sign Out From All Devices
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Appearance Settings
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Customize how GenKreer Coach looks for you
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-slate-800 mb-4">Theme</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {themeOptions.map((theme) => (
                            <div
                              key={theme.value}
                              className={`border rounded-lg p-4 cursor-pointer ${
                                theme.selected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-blue-300"
                              }`}
                              onClick={() => handleThemeChange(theme.value)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-800">
                                  {theme.name}
                                </span>
                                {theme.selected && (
                                  <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-slate-500">
                                {theme.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Dashboard Layout</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="compact"
                              name="layout"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to compact view")}
                            />
                            <label
                              htmlFor="compact"
                              className="ml-2 block text-slate-800"
                            >
                              Compact view
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="comfortable"
                              name="layout"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to comfortable view")}
                            />
                            <label
                              htmlFor="comfortable"
                              className="ml-2 block text-slate-800"
                            >
                              Comfortable view
                            </label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Display Density</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-compact"
                              name="density"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to compact density")}
                            />
                            <label
                              htmlFor="density-compact"
                              className="ml-2 block text-slate-800"
                            >
                              Compact
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-default"
                              name="density"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to default density")}
                            />
                            <label
                              htmlFor="density-default"
                              className="ml-2 block text-slate-800"
                            >
                              Default
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="density-comfortable"
                              name="density"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={() => console.log("Changed to comfortable density")}
                            />
                            <label
                              htmlFor="density-comfortable"
                              className="ml-2 block text-slate-800"
                            >
                              Comfortable
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handleSavePreferences}
                        >
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Integrations
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Connect your GenKreer Coach account with other services
                      </p>
                    </div>

                    <div className="space-y-4">
                      {integrations.map((integration, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border border-slate-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                              <img
                                src={integration.icon}
                                alt={integration.name}
                                className="h-6 w-6"
                                onError={(e) => {
                                  e.currentTarget.src = "https://placehold.co/24x24/gray/white?text=I";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-800">
                                {integration.name}
                              </h3>
                              <p className="text-sm text-slate-500">
                                {integration.status}{" "}
                                {integration.lastSync && `• Last sync: ${integration.lastSync}`}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant={
                              integration.status === "Connected"
                                ? "outline"
                                : "default"
                            }
                            className={
                              integration.status === "Connected"
                                ? "text-red-500 border-red-300 hover:bg-red-50"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
                            onClick={() => 
                              integration.status === "Connected" 
                                ? handleDisconnectIntegration(integration.name) 
                                : handleConnectIntegration(integration.name)
                            }
                          >
                            {integration.status === "Connected"
                              ? "Disconnect"
                              : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-1">
                        Privacy Settings
                      </h2>
                      <p className="text-slate-500 mb-6">
                        Manage your data and privacy preferences
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium text-slate-800">
                            Profile Visibility
                          </h3>
                          <p className="text-sm text-slate-500">
                            Control who can see your profile information
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => console.log("Opening profile visibility settings")}
                        >
                          Public <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium text-slate-800">
                            Data Usage
                          </h3>
                          <p className="text-sm text-slate-500">
                            Manage how your data is used to improve our services
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                            onChange={() => console.log("Toggled data usage consent")}
                          />
                          <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-slate-800 mb-3">
                          Your Data
                        </h3>
                        <div className="space-y-4">
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => handleExportData("email")}
                          >
                            <div className="flex items-center gap-2">
                              <MailIcon className="h-5 w-5" />
                              <span>Export Email History</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => handleExportData("profile")}
                          >
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-5 w-5" />
                              <span>Export Profile Data</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full justify-between text-red-500 border-red-300 hover:bg-red-50"
                            onClick={handleDeleteAccount}
                          >
                            <div className="flex items-center gap-2">
                              <ShieldIcon className="h-5 w-5" />
                              <span>Delete Account</span>
                            </div>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};