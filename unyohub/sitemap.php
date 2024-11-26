<?php
$root_url = "http".(empty($_SERVER["HTTPS"]) ? "" : "s")."://".$_SERVER["HTTP_HOST"];

if (empty($_SERVER["PATH_INFO"])) {
    header("Location: /sitemap.php/", TRUE, 301);
} elseif ($_SERVER["PATH_INFO"] === "/") {
    header("Content-Type: application/xml");
    
    print "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    print "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    print "    <sitemap>\n";
    print "        <loc>".$root_url."/sitemap.php/main/</loc>\n";
    print "    </sitemap>\n";
    
    $railroads = json_decode(file_get_contents("config/railroads.json"), TRUE);
    
    foreach ($railroads["railroads_order"] as $railroad_id) {
        print "    <sitemap>\n";
        print "        <loc>".$root_url."/sitemap.php/railroad_".$railroad_id."/</loc>\n";
        print "    </sitemap>\n";
    }
    
    print "</sitemapindex>\n";
} else {
    if (substr($_SERVER["PATH_INFO"], 0, 10) === "/railroad_") {
        $railroad_id = basename(substr($_SERVER["PATH_INFO"], 10, -1));
        
        if (!file_exists("data/".$railroad_id."/railroad_info.json")) {
            header("HTTP/1.1 404 Not Found");
            exit;
        }
    } elseif ($_SERVER["PATH_INFO"] !== "/main/") {
        header("HTTP/1.1 404 Not Found");
        exit;
    }
    
    header("Content-Type: application/xml");
    
    print "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    print "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    
    if ($_SERVER["PATH_INFO"] === "/main/") {
        print "    <url>\n";
        print "        <loc>".$root_url."/</loc>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$root_url."/user/rules.php</loc>\n";
        print "    </url>\n";
    } else {
        $railroad_root = $root_url."/railroad_".$railroad_id;
        
        print "    <url>\n";
        print "        <loc>".$railroad_root."/</loc>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/timetable/</loc>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/operation_data/</loc>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/formations/</loc>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/operation_table/</loc>\n";
        print "    </url>\n";
        
        $railroad_info = json_decode(file_get_contents("data/".$railroad_id."/railroad_info.json"), TRUE);
        $formations = json_decode(file_get_contents("data/".$railroad_id."/formations.json"), TRUE);
        
        foreach ($railroad_info["lines_order"] as $line_id) {
            print "    <url>\n";
            print "        <loc>".$railroad_root."/timetable/".$line_id."/</loc>\n";
            print "    </url>\n";
            
            foreach ($railroad_info["lines"][$line_id]["stations"] as $station) {
                if (empty($station["is_signal_station"])) {
                    print "    <url>\n";
                    print "        <loc>".$railroad_root."/timetable/".$line_id."/".urlencode($station["station_name"])."/</loc>\n";
                    print "    </url>\n";
                }
            }
        }
        
        $formation_names = array_keys($formations["formations"]);
        foreach ($formation_names as $formation_name) {
            print "    <url>\n";
            print "        <loc>".$railroad_root."/formations/".urlencode($formation_name)."/</loc>\n";
            print "    </url>\n";
        }
    }
    
    print "</urlset>\n";
}