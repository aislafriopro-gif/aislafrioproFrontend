import { useQuery } from "@tanstack/react-query";
import { faqService } from "@/services/faq.service";


export const useFaq = () => {
    return useQuery({
    queryKey: ["faq"],
    queryFn: () => faqService.getAll(),
    });
};