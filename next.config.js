const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  assetPrefix: isProd ? `https://cdn.${process.env.NEXT_PUBLIC_DOMAIN}` : '',
};
