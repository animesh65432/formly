import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Get, create, update, GetUserfroms, GetfrombyId, Delete } from "../api/from";
import type { FormBlock, Blocks, GetFormResponse } from "../types";

export const useGetFroms = (token: string) => useQuery<Blocks>({
    queryKey: ["froms", token],
    queryFn: () => Get(token)
})

export const useCreateFrom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token, block }: { token: string; block: FormBlock[] }) => {
            const blocksWithPos = block.map((block, i) => ({ ...block, position: i }));
            return create(token, blocksWithPos);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['froms'] });
        },
    });
};
export const useUpateFrom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: {
            token: string;
            id: string;
            block: FormBlock[]
        }) => {
            const { token, block, id } = params;
            return update(
                token,
                block,
                id
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["froms"] });
        },
    });
}

export const useGetUserfroms = (token: string) => useQuery({
    queryKey: ["Userfroms", token],
    queryFn: () => GetUserfroms(token)
})

export const useGetfrombyId = (token: string, id: string) => useQuery<GetFormResponse>({
    queryKey: ["from", token],
    queryFn: () => GetfrombyId(token, id)
})

export const useDeletefrom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token, id }: { token: string; id: string }) => Delete(token, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['froms'] });
        }
    });
};
