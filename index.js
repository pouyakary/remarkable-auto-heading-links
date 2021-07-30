
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const SPACES =
        /\s+/g
    const ANYTHING_BUT_ALLOWED_HEADER_ID_CHARACTERS =
        /[^0-9a-zA-Z\-\:_\.]+/g

//
// ─── ADD ID TO HEADER ───────────────────────────────────────────────────────────
//

    module.exports.addIDToAllMarkdownHeaders = function ( md ) {
        md.renderer.rules.heading_open = function ( tokens, idx ) {
            const headerTitle =
                findHeaderTitle( tokens, idx )
            const id =
                turnHeaderTextToID( headerTitle )
            const serializedHeader =
                `<h${ tokens[ idx ].hLevel } id="${ id }"><a href="#${ id }">`

            return serializedHeader
        }

        md.renderer.rules.heading_close = function ( tokens, idx ) {
            return `</a></h${ tokens[ idx ].hLevel }>`
        }
    }

//
// ─── FIND HEADER TITLE ──────────────────────────────────────────────────────────
//

    function findHeaderTitle ( tokens, idx ) {
        const inlineToken =
            tokens[ idx + 1 ]
        let headerTitle =
            ""

        for ( const child of inlineToken.children ) {
            if ( child.type === "text" ) {
                headerTitle += " " + child.content
            }
        }

        return headerTitle
    }

//
// ─── TURN HEADER TEXT TO ID ─────────────────────────────────────────────────────
//

    function turnHeaderTextToID ( headerTitle ) {
        headerTitle =
            headerTitle.trim( ).toLowerCase( )
        const id =
            headerTitle
                // Replace & with "and"
                .replace( /&/g,
                    "and" )
                // Replace spaces with hyphen
                .replace( SPACES,
                    "-" )
                // Remove all the unsupported text
                .replace( ANYTHING_BUT_ALLOWED_HEADER_ID_CHARACTERS,
                    "" )
        return id
    }

// ────────────────────────────────────────────────────────────────────────────────
