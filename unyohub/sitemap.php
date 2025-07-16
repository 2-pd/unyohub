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
    
    foreach (array_keys($railroads["railroads"]) as $railroad_id) {
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
        print "        <changefreq>yearly</changefreq>\n";
        print "        <priority>1.0</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$root_url."/user/rules.php</loc>\n";
        print "        <changefreq>yearly</changefreq>\n";
        print "        <priority>0.3</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$root_url."/user/clear_caches.php</loc>\n";
        print "        <changefreq>never</changefreq>\n";
        print "        <priority>0.3</priority>\n";
        print "    </url>\n";
    } else {
        $railroad_root = $root_url."/railroad_".$railroad_id;
        
        print "    <url>\n";
        print "        <loc>".$railroad_root."/</loc>\n";
        print "        <changefreq>always</changefreq>\n";
        print "        <priority>0.9</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/timetable/</loc>\n";
        print "        <changefreq>yearly</changefreq>\n";
        print "        <priority>0.8</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/operation_data/</loc>\n";
        print "        <changefreq>daily</changefreq>\n";
        print "        <priority>0.8</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/formations/</loc>\n";
        print "        <changefreq>monthly</changefreq>\n";
        print "        <priority>0.8</priority>\n";
        print "    </url>\n";
        print "    <url>\n";
        print "        <loc>".$railroad_root."/operation_table/</loc>\n";
        print "        <changefreq>yearly</changefreq>\n";
        print "        <priority>0.8</priority>\n";
        print "    </url>\n";
        
        $railroad_info = json_decode(file_get_contents("data/".$railroad_id."/railroad_info.json"), TRUE);
        $formations = json_decode(file_get_contents("data/".$railroad_id."/formations.json"), TRUE);
        $diagram_revisions = file("data/".$railroad_id."/diagram_revisions.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
        foreach ($railroad_info["lines_order"] as $line_id) {
            print "    <url>\n";
            print "        <loc>".$railroad_root."/timetable/".$line_id."/</loc>\n";
            print "        <changefreq>yearly</changefreq>\n";
            print "        <priority>0.7</priority>\n";
            print "    </url>\n";
            
            foreach ($railroad_info["lines"][$line_id]["stations"] as $station) {
                if (empty($station["is_signal_station"])) {
                    print "    <url>\n";
                    print "        <loc>".$railroad_root."/timetable/".$line_id."/".urlencode($station["station_name"])."/</loc>\n";
                    print "        <changefreq>daily</changefreq>\n";
                    print "        <priority>0.4</priority>\n";
                    print "    </url>\n";
                }
            }
        }
        
        $formation_names = array_keys($formations["formations"]);
        foreach ($formation_names as $formation_name) {
            if (!empty($formations["formations"][$formation_name]["new_formation_name"])) {
                continue;
            }
            
            print "    <url>\n";
            print "        <loc>".$railroad_root."/formations/".urlencode($formation_name)."/</loc>\n";
            if (!empty($formations["formations"][$formation_name]["cars"])) {
                print "        <changefreq>yearly</changefreq>\n";
                print "        <priority>0.6</priority>\n";
            } else {
                print "        <changefreq>never</changefreq>\n";
                print "        <priority>0.2</priority>\n";
            }
            print "    </url>\n";
        }
        
        for ($cnt = 0; isset($diagram_revisions[$cnt]); $cnt++) {
            print "    <url>\n";
            print "        <loc>".$railroad_root."/operation_table/".$diagram_revisions[$cnt]."/</loc>\n";
            if ($cnt === 0) {
                print "        <changefreq>yearly</changefreq>\n";
                print "        <priority>0.5</priority>\n";
            } else {
                print "        <changefreq>never</changefreq>\n";
                print "        <priority>0.1</priority>\n";
            }
            print "    </url>\n";
        }
    }
    
    print "</urlset>\n";
}