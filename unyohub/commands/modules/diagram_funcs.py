# coding: utf-8

import time
import json

class diagram:
    def __init__ (self, main_dir, mes=None):
        if mes is None:
            self.mes = self.print_error
        else:
            self.mes = mes
        
        self.main_dir = main_dir
        self.diagram_revisions = None
        self.diagram_info = {}
    
    def print_error (self, log_text, is_error=None):
        print("【エラー】" + str(log_text))
    
    def get_date_string (self, ts=None):
        if ts is None:
            ts = int(time.time())
        
        return time.strftime("%Y-%m-%d", time.localtime(ts - 10800))
    
    def get_diagram_revision (self, date_string=None):
        if self.diagram_revisions is None:
            try:
                with open(self.main_dir + "/diagram_revisions.txt", "r", encoding="utf-8-sig") as diagram_revisions_f:
                    self.diagram_revisions = [line.rstrip() for line in diagram_revisions_f.readlines()]
            except:
                self.mes("diagram_revisions.txtの読み込みに失敗しました", True)
                
                return None
        
        if date_string is None:
            date_string = self.get_date_string()
        
        for diagram_revision in self.diagram_revisions:
            if diagram_revision < date_string:
                return diagram_revision
        
        return None
    
    def load_diagram_info (self, diagram_revision=None):
        if diagram_revision is None:
            diagram_revision = self.get_diagram_revision()
            
            if diagram_revision is None:
                return False
        
        try:
            with open(self.main_dir + "/" + diagram_revision + "/diagram_info.json", "r", encoding="utf-8-sig") as json_f:
                self.diagram_info[diagram_revision] = json.load(json_f)
        except:
            self.mes("diagram_info.jsonの読み込みに失敗しました", True)
            return False
        else:
            return True
    
    def get_holiday_list (self, year):
        holiday_list = ["01-01", "02-11", "02-23", "04-29", "05-03", "05-04", "05-05", "08-11", "11-03", "11-23"]
        happy_monday_list = [["01", 2], ["07", 3], ["09", 3], ["10", 2]]
        
        holiday_list.append("03-" + str(int(20.8431 + 0.242194 * (year - 1980)) - int((year - 1980) / 4)))
        shubun = int(23.2488 + 0.242194 * (year - 1980)) - int((year - 1980) / 4)
        holiday_list.append("09-" + str(shubun))
        
        for happy_monday in happy_monday_list:
            ts = time.strptime(str(year) + "-" + happy_monday[0] + "-01", "%Y-%m-%d")
            
            day_number = int(time.strftime("%w", ts))
            if day_number <= 1:
                day_number += 7
            
            holiday_list.append(happy_monday[0] + "-" + str(2 - day_number + (7 * happy_monday[1])).zfill(2))
        
        for holiday in holiday_list:
            ts = time.strptime(str(year) + "-" + holiday, "%Y-%m-%d")
            
            if int(time.strftime("%w", ts)) == 0:
                furikae_cnt = 0
                
                while True:
                    furikae_cnt += 1
                    furikae_date = holiday[:2] + "-" + str(int(holiday[3:]) + furikae_cnt).zfill(2)
                    
                    if furikae_date not in holiday_list:
                        break
                
                holiday_list.append(furikae_date)
        
        if "09-" + str(shubun - 2) in holiday_list:
            holiday_list.append("09-" + str(shubun - 1))
        
        return holiday_list
    
    def get_diagram_id (self, date_string=None):
        if date_string is None:
            date_string = self.get_date_string()
        
        diagram_revision = self.get_diagram_revision(date_string)
        
        if diagram_revision is None:
            return None, None
        
        if diagram_revision not in self.diagram_info:
            if not self.load_diagram_info(diagram_revision):
                return diagram_revision, None
        
        if date_string in self.diagram_info[diagram_revision]["exceptional_dates"]:
            return diagram_revision, self.diagram_info[diagram_revision]["exceptional_dates"][date_string]
        
        if date_string[5:] in self.get_holiday_list(int(date_string[:4])):
            day_index = 0
        else:
            day_index = int(time.strftime("%w", time.strptime(date_string, "%Y-%m-%d")))
        
        for diagram_schedule in self.diagram_info[diagram_revision]["diagram_schedules"]:
            for period in diagram_schedule["periods"]:
                if period["start_date"] < date_string and (period["end_date"] is None or period["end_date"] > date_string):
                    return diagram_revision, diagram_schedule["diagrams_by_day"][day_index]
        
        return diagram_revision, None
