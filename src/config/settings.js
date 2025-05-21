

module.exports = {
    rateLimitSettings: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // 100 request limit for per 15 minutes
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    swaggerSettings: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Ödül Yönetim Servisi',
                version: '1.0.0',
                description: 'Ödül Yönetim Swagger API',
            },
            servers: [
                {
                    url: 'http://localhost:3000/api',
                },
            ],
        },
        apis: ['./src/routes/*.js'], // API rotalarının bulunduğu dosya
    }
}