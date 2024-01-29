
import React, { useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import i18n from "../config/i18n"
import Header from "../layouts/Header";
import "../assets/style/Header.css";
import "../assets/style/CustomerList.css";
import "../assets/style/Home.css";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Footer from '../layouts/Footer';
import GraphsHomePage from '../components/GraphHomePage/GraphsHomePage';
import { HOME } from "../navigation/Constants"
import { useContext } from 'react';
import { AuthContext } from '../config/Authentications/AuthContext';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { useEffect } from 'react';

const Home = () => {
    const {authState} = useContext(AuthContext)
    const [state, setState] = useState({})
    const token = authState.token
    let isloggedIn = false
    let isResetHeader = "false"
    if (token != null) {
        isloggedIn = true
    } else {
        isloggedIn = false
    }

    useEffect(() => {
        if (token && authState?.companyId && authState?.clanguage && i18n.language !== authState?.clanguage) {
            const client = new S3Client({
                "region": process.env.REACT_APP_AWS_DEFAULT_REGION,
                "credentials": {
                    "accessKeyId": process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    "secretAccessKey": process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
                }
            });


            const input = {
                Bucket: process.env.REACT_APP_AWS_BUCKET,
                Key: `${authState?.companyId}_language/${authState?.clanguage}.json`, //user,
            };

            const command = new GetObjectCommand(input);
            client.send(command)
                .then(res => res.Body.transformToString())
                .then(res => {
                    i18n.addResourceBundle(
                        authState?.clanguage || authState?.companyId || 'default',
                        'translations',
                        JSON.parse(res)['translations']
                    );
                    i18n.changeLanguage(authState?.clanguage || authState?.companyId || 'default');
                    authState['clanguage'] = authState?.clanguage || authState?.companyId || 'default'
                })
                .catch(err => {

                    const inputC = {
                        Bucket: process.env.REACT_APP_AWS_BUCKET,
                        Key: `${authState?.companyId}_language/${authState?.companyId}.json`, //company
                    };
                    const defaultCommand = new GetObjectCommand(inputC);
                    client.send(defaultCommand)
                        .then(defaultRes => defaultRes.Body.transformToString())
                        .then(defaultRes => {
                            i18n.addResourceBundle(String(authState?.companyId), 'translations', JSON.parse(defaultRes)['translations']);
                            i18n.changeLanguage(String(authState?.companyId));
                            authState['clanguage'] = String(authState?.companyId)
                        })
                        .catch(err => {
                            const defaultInput = {
                                Bucket: process.env.REACT_APP_AWS_BUCKET,
                                Key: `${authState?.companyId}_language/translate.json`, //default
                            };
                            const defaultCommand = new GetObjectCommand(defaultInput);
                            client.send(defaultCommand)
                                .then(defaultRes => defaultRes.Body.transformToString())
                                .then(defaultRes => {
                                    i18n.addResourceBundle('default', 'translations', JSON.parse(defaultRes)['translations']);
                                    i18n.changeLanguage('default');
                                    authState['clanguage'] = 'default'
                                })
                                .catch(err => console.log(err));


                        });

                });
        }
    }, [authState?.clanguage, authState?.companyId, authState?.username, token, i18n.language]);




    // const lang = authState.language
    // if (lang) {
    //     i18n.changeLanguage(lang)
    // }

    if (state.isloggedIn === false) {
        return <Navigate to="/" push={true} />
    }

    return (

        <>
            <div className="header_pos col-12"><Header /></div>
            {window.location.href === "https://events-ui.accellier.net/#/home/" || HOME ?
                <GraphsHomePage />
                :null               
            }
            <Footer />
        </>

    )

}

export default Home;
