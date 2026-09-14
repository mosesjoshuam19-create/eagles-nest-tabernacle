
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useToast } from '@/hooks/use-toast';

const PWAInstallPrompt = () => {
  const [dismissed, setDismissed] = useState(false);
  const { isInstallable, isOnline, updateAvailable, installApp, updateApp } = usePWA();
  const { toast } = useToast();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      toast({
        title: "App Installed!",
        description: "Eagle's Nest Tabernacle has been added to your home screen.",
      });
      setDismissed(true);
    } else {
      toast({
        title: "Installation Failed",
        description: "Unable to install the app. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = () => {
    updateApp();
    toast({
      title: "Updating App",
      description: "The app will refresh with the latest version.",
    });
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Offline indicator */}
      {!isOnline && (
        <Card className="mb-2 border-orange-500 bg-orange-50">
          <CardContent className="flex items-center gap-2 p-3">
            <WifiOff className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-800">You're offline</span>
          </CardContent>
        </Card>
      )}

      {/* Update available */}
      {updateAvailable && (
        <Card className="mb-2 border-blue-500 bg-blue-50">
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">Update available</span>
            </div>
            <Button size="sm" onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
              Update
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Install prompt */}
      {isInstallable && (
        <Card className="border-[#1e40af] bg-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-[#1e40af]">Install App</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-600 mb-3">
              Install Eagle's Nest Tabernacle for quick access and offline features.
            </p>
            <Button
              onClick={handleInstall}
              className="w-full bg-[#1e40af] hover:bg-[#1e40af]/90"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Online status indicator when back online */}
      {isOnline && (
        <div className="fixed bottom-4 left-4 z-50">
          <Card className="border-green-500 bg-green-50">
            <CardContent className="flex items-center gap-2 p-3">
              <Wifi className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">Back online</span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
