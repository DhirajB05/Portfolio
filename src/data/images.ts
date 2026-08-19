const getAssetUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
};

export const userImages = {
  profile: {
    avatar: getAssetUrl('/images/profile/pfp-latest.jpg'),
    qrCode: getAssetUrl('/images/profile/qr-code.png'),
  },
  projects: {
    project1: getAssetUrl('/images/projects/agneisx.png'),
    project2: getAssetUrl('/images/projects/eclipse.png'),
    project3: getAssetUrl('/images/projects/roast-machine.png'),
    project4: getAssetUrl('/images/projects/rag-app.png'),
    project5: getAssetUrl('/images/projects/podman.png'),
    project6: getAssetUrl('/images/projects/codeminds.png'),
  },
  decorations: {
    soulLeavingBody: getAssetUrl('/images/decorations/soul-leaving-body.png'),
    cyberKatana: getAssetUrl('/images/decorations/cyber-katana.png'),
    candlelightDark: getAssetUrl('/images/decorations/candlelight-dark.png'),
    shy: getAssetUrl('/images/decorations/shy.png'),
    blossomBurst: getAssetUrl('/images/decorations/blossom-burst.png'),
  },
};

export default userImages;
