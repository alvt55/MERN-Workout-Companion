'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input, Stack, Heading, Text } from '@chakra-ui/react';
import { Field } from "../../components/ui/field"


export default function Search() {


    const searchParams = useSearchParams();



    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term.toLowerCase());
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <div>

            <Heading as="h1" size="2xl">Discover New Exercises</Heading>
            <Stack gap="3" align="flex-start" maxW="sm" m="3rem 0" fontSize={'1.5rem'} minW="30vw">


                <Field label="Search">
                    <Input
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                    />

                </Field>

            </Stack>
        </div>

    );
}