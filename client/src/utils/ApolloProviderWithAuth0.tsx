import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/link-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

interface IApolloProviderWithAuth0 {
    children: any
}

const ApolloProviderWithAuth0 = ({children}: IApolloProviderWithAuth0) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [bearerToken, setBearerToken] = useState('');

    useEffect(() => {
        const getToken = async () => {
            const token = isAuthenticated ? await getAccessTokenSilently() : '';
            setBearerToken(token);
        }

        getToken();
    }, [getAccessTokenSilently, isAuthenticated]);

    const authLink = setContext((_, { headers, ...rest }) => {
        if (!bearerToken) return { headers, ...rest };

        return {
            ...rest,
            headers: {
                ...headers,
                authorization: `Bearer ${bearerToken}`
            }
        }
    })
    
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_URI,  
    })

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    })


    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    )
}

export default ApolloProviderWithAuth0;