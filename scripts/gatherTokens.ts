import axios from "axios";
import { writeFile } from "fs/promises";

interface TokenSource {
  name: string;
  url: string;
}

interface TokenData {
  name: string;
  data: JSON;
}

type TokenFetchError = {
  error: string;
};

async function fetchFromZH(
  source: TokenSource
): Promise<TokenData | TokenFetchError> {
  const { url, name } = source;
  try {
    const resp = await axios.get<JSON>(url);

    return { name, data: resp.data };
  } catch (error) {
    return { error: `Unable to fetch tokens from ${url}` };
  }
}

function isTokenFetchError(
  resp: TokenFetchError | TokenData
): resp is TokenFetchError {
  return (resp as TokenFetchError).error !== undefined;
}

async function gatherTokens() {
  const URLS: TokenSource[] = [
    {
      name: "color-global",
      url: "https://remaxdesign.zeroheight.com/api/token_file/883ff9e9447f/share",
    },
    {
      name: "color-alias",
      url: "https://remaxdesign.zeroheight.com/api/token_file/56fbaaa49948/share",
    },
    {
      name: "size-global",
      url: "https://remaxdesign.zeroheight.com/api/token_file/e127d3fffa09/share",
    },
    {
      name: "size-alias",
      url: "https://remaxdesign.zeroheight.com/api/token_file/5ad282b0c7c9/share",
    },
    {
      name: "typography-global",
      url: "https://remaxdesign.zeroheight.com/api/token_file/22605184a021/share",
    },
    {
      name: "typography-alias",
      url: "https://remaxdesign.zeroheight.com/api/token_file/5cf07899e712/share",
    },
  ];
  const responses = await Promise.all(
    URLS.map((source) => fetchFromZH(source))
  );

  const validResponses: TokenData[] = responses.filter(
    (val): val is TokenData => !isTokenFetchError(val)
  );
  console.info("Gathered successfully", validResponses);

  validResponses.map(({ name, data }) => {
    const category = name.split("-")[0];
    writeFile(`./tokens/${category}/${name}-tokens.json`, JSON.stringify(data));
  });
}

gatherTokens();
