// "use client";

// import React, { useState } from "react";

// // Définition du type pour un élément de violation (breach)
// type Breach = {
//   Name: string;
//   Title: string;
// };

// export default function EmailChecker() {
//   const [email, setEmail] = useState<string>("");
//   const [isBreached, setIsBreached] = useState<boolean | null>(null);
//   const [breaches, setBreaches] = useState<Breach[]>([]);

//   const checkEmail = async () => {
//     setIsBreached(null);
//     setBreaches([]);

//     try {
//       const response = await fetch(
//         `/api/checkEmail?email=${encodeURIComponent(email)}`
//       );
//       if (!response.ok) {
//         // Si l'email n'est pas trouvé dans des violations ou une autre erreur survient
//         setIsBreached(false);
//         console.error("Erreur ou email non trouvé dans des violations.");
//         return;
//       }

//       const data: Breach[] = await response.json();
//       if (data.length > 0) {
//         setIsBreached(true);
//         setBreaches(data);
//       } else {
//         setIsBreached(false);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la vérification:", error);
//       setIsBreached(null);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Entrez votre adresse email"
//       />
//       <button onClick={checkEmail}>Vérifier l&apos;email</button>
//       {isBreached === false && (
//         <p>
//           Votre email n&apos;a pas été trouvé dans des violations de données.
//         </p>
//       )}
//       {isBreached && (
//         <div>
//           <p>Votre email a été trouvé dans les violations suivantes :</p>
//           <ul>
//             {breaches.map((breach, index) => (
//               // Utilisation de l'index comme clé en l'absence d'un identifiant unique
//               <li key={index}>{breach.Title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
