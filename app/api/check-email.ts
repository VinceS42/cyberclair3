// import type { NextApiRequest, NextApiResponse } from "next"

// type BreachResponse = {
//     Name: string
//     Title: string
//     Domain: string
//     // Autres champs selon la réponse de l'API HIBP
// }

// type ApiResponse = {
//     message?: string
//     error?: string
//     data?: BreachResponse[]
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ApiResponse>
// ) {
//     const { email } = req.query

//     if (!email || typeof email !== "string") {
//         return res
//             .status(400)
//             .json({ error: "Email is required and must be a string" })
//     }

//     const API_KEY = process.env.HIBP_API_KEY // Assure-toi que ta clé API est dans les variables d'environnement
//     const URL = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
//         email
//     )}`

//     try {
//         const apiRes = await fetch(URL, {
//             method: "GET",
//             headers: {
//                 "User-Agent": "Cyberclair3",
//                 "hibp-api-key": API_KEY ?? "",
//             },
//         })

//         if (!apiRes.ok) {
//             if (apiRes.status === 404) {
//                 return res
//                     .status(404)
//                     .json({ message: "No breach found for this email" })
//             } else {
//                 throw new Error("Failed to fetch the breaches")
//             }
//         }

//         const data: BreachResponse[] = await apiRes.json()
//         return res.status(200).json({ data })
//     } catch (error) {
//         console.error("Error:", error)
//         return res.status(500).json({ error: "Internal server error" })
//     }
// }