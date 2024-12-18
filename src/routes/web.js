const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Create a new user
router.post("/add-user", userController.createUser);

// Update an existing user
router.post("/update-user", userController.updateUser);

// Delete a user
router.post("/delete-user", userController.deleteUser);

// endpoint for post stack:
router.get("/add-stack", () => {
  const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJhYm1tIiwicm9sZSI6Miwic2NvcGUiOiJkZWZhdWx0IiwiZm9yY2VDaGFuZ2VQYXNzd29yZCI6ZmFsc2UsImV4cCI6MTczMDczOTc0NywiaWF0IjoxNzMwNzEwOTQ3LCJqdGkiOiI1MjNiYzZhNi1iNTgyLTQzY2MtYWIzMS0zZjBlMTViNzA0MzkifQ.voYkST8f5TVec5m-GyeHYGw7hDMSzDUpB1lArqhQnF4"; //Skal I være i stand til at opdatere
  const swarmId = "v1pkdou24tzjtncewxhvpmjms";
  const endpointId = 5;
  const subDomainWp = "testtest";
  const subDomainPma = "testtest-pma";
  const websideId = Math.random().toString(36).substring(7);
  const pmaId = Math.random().toString(36).substring(7);
  const body `networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.${websideId}.rule=Host(\`${subDomainWp}.kubelab.dk\`)\n        - traefik.http.routers.${websideId}.entrypoints=web,websecure\n        - traefik.http.routers.${websideId}.tls.certresolver=letsencrypt\n        - traefik.http.services.${websideId}.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.${pmaId}.rule=Host(\`${subDomainPma}.kubelab.dk\`)\n        - traefik.http.routers.${pmaId}.entrypoints=web,websecure\n        - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt\n        - traefik.http.services.${pmaId}.loadbalancer.server.port=80`;
//   const body = `
// networks:
//   traefik-proxy:
//     external: true
//   wp-network:
//     driver: overlay

// services:
//   wordpress:
//     image: wordpress:latest
//     environment:
//       WORDPRESS_DB_HOST: db
//       WORDPRESS_DB_USER: wpuser
//       WORDPRESS_DB_PASSWORD: wppassword
//       WORDPRESS_DB_NAME: wpdatabase
//     networks:
//       - traefik-proxy
//       - wp-network
//     deploy:
//       labels:
//         - traefik.enable=true
//         - traefik.http.routers.${websideId}.rule=Host(\`${subDomainWp}.kubelab.dk\`)
//         - traefik.http.routers.${websideId}.entrypoints=web,websecure
//         - traefik.http.routers.${websideId}.tls.certresolver=letsencrypt
//         - traefik.http.services.${websideId}.loadbalancer.server.port=80

//   db:
//     image: mariadb:latest
//     environment:
//       MYSQL_ROOT_PASSWORD: rootpassword
//       MYSQL_DATABASE: wpdatabase
//       MYSQL_USER: wpuser
//       MYSQL_PASSWORD: wppassword
//     networks:
//       - wp-network

//   phpmyadmin:
//     image: phpmyadmin:latest
//     environment:
//       PMA_HOST: db
//       PMA_USER: wpuser
//       PMA_PASSWORD: wppassword
//     networks:
//       - traefik-proxy
//       - wp-network
//     deploy:
//       labels:
//         - traefik.enable=true
//         - traefik.http.routers.${pmaId}.rule=Host(\`${subDomainPma}.kubelab.dk\`)
//         - traefik.http.routers.${pmaId}.entrypoints=web,websecure
//         - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt
//         - traefik.http.services.${pmaId}.loadbalancer.server.port=80
// `;

  fetch(
    `https://portainer.kubelab.dk/api/stacks/create/swarm/string?endpointId=${endpointId}`,
    {
      method: "POST",
      body: body,
        headers: {
        "Authorization": `Bearer ${jwtToken}`,
            "Content-type": "application/json; charset=UTF-8"
        },
    }
  )
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => {
      console.log(error);
    });

  res.send("Fetch API is available on the global scope by default");
});

module.exports = router;
