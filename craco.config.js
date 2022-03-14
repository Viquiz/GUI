const CracoAlias = require("craco-alias");
module.exports = {
    style: {
        postcssOptions: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "./",
                aliases: {
                    "@components": "./src/components",
                    "@pages": "./src/pages",
                    "@style": "./src/style",
                    "@common": "./src/common",
                },
                debug: false,
            },
        },
    ],
};
