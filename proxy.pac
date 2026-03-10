function FindProxyForURL(url, host) {
    var proxy = "PROXY 127.0.0.1:7897";
    var direct = "DIRECT";

    // 本地地址直连
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.0", "255.255.255.0")) {
        return direct;
    }

    // 需要走代理的域名关键词
    var proxyKeywords = [
        "google", "googleapis", "googleusercontent", "gstatic", "ggpht",
        "youtube", "youtu", "ytimg", "googlevideo", "yt.be",
        "steampowered", "steamcommunity", "steamstatic", "steamcdn",
        "steamserver", "steamusercontent", "valvesoftware",
        "github", "githubusercontent", "githubassets",
        "telegram", "t.me", "tdesktop", "telegra.ph",
        "twitter", "x.com", "twimg", "facebook", "fbcdn",
        "instagram", "whatsapp", "reddit", "redd.it", "imgur",
        "discord", "discordapp", "twitch", "ttvnw",
        "pinterest", "pinimg", "tiktok", "tiktokcdn",
        "linkedin", "licdn", "snapchat",
        "stackoverflow", "stackexchange", "npmjs", "pypi",
        "docker", "medium", "gitlab",
        "openai", "chatgpt", "anthropic", "claude", "perplexity",
        "wikipedia", "wikimedia", "arxiv", "springer", "sciencedirect",
        "klei", "91porn", "pornhub", "phncdn", "51cg", "jiuse3", "cdn77"
    ];

    for (var i = 0; i < proxyKeywords.length; i++) {
        if (host.indexOf(proxyKeywords[i]) !== -1) {
            return proxy;
        }
    }

    return direct;
}
