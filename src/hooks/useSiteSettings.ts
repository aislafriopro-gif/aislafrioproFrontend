import { useQuery } from "@tanstack/react-query";
import { siteSettingsService } from "@/services/siteSettings.service";


export const useSiteSettings = () => {
    return useQuery({
    queryKey: ["site-settings"],
    queryFn: () => siteSettingsService.getSettings(),
    });
};