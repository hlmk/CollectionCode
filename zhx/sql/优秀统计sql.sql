select
		ce.se_name seName,
    count(DISTINCT cpr.pr_cas_id) countCase,

    sum(/*八点前有效电话*/
    if( (HOUR(cpr.pr_time)   <   8 and cpr.pr_typ_id != 35),1,0)
    ) effective8,
    sum(/*八点前总通电量*/
    if( (HOUR(cpr.pr_time)   <   8),1,0)
    ) count8,
    count( /*八点前个案量*/
    DISTINCT (
    if( (HOUR(cpr.pr_time)   <   8),cpr.pr_cas_id,null)
    )
    ) countCase8,

    sum(/*8-12点有效通电*/
    if( (HOUR(cpr.pr_time)   >=   8 and HOUR(cpr.pr_time)   <   12 and cpr.pr_typ_id != 35),1,0)
    ) effective8_12,
    sum(/*8-12点总通电*/
    if( (HOUR(cpr.pr_time)   >=   8 and HOUR(cpr.pr_time)   <   12),1,0)
    ) count8_12,
    count(/*8-12点个案量*/
    DISTINCT (
    if( (HOUR(cpr.pr_time)   >=   8 and HOUR(cpr.pr_time)   <   12),cpr.pr_cas_id,null)
    )
    ) countCase8_12,

    sum(/*12-18点有效通电*/
    if( (HOUR(cpr.pr_time)   >=   12 and HOUR(cpr.pr_time)   <   18 and cpr.pr_typ_id != 35),1,0)
    ) effective12_18,
    sum(/*12-18点总通电*/
    if( (HOUR(cpr.pr_time)   >=   12 and HOUR(cpr.pr_time)   <   18),1,0)
    ) count12_18,
    count(/*12-18点个案量*/
    DISTINCT (
    if( (HOUR(cpr.pr_time)   >=   12 and HOUR(cpr.pr_time)   <   18),cpr.pr_cas_id,null)
    )
    ) countCase12_18,

    sum(/*18点以后有效通电*/
    if( (HOUR(cpr.pr_time)   >=   18 and cpr.pr_typ_id != 35),1,0)
    ) effective18,
    sum(/*18点以后总通电*/
    if( (HOUR(cpr.pr_time)   >=   18),1,0)
    ) count18,
    count(/*18点以后个案量*/
    DISTINCT (
    if( (HOUR(cpr.pr_time)   >=   18),cpr.pr_cas_id,null)
    )
    ) countCase18,

    sum(/*合计有效通电*/
    if( (cpr.pr_time is not null and cpr.pr_typ_id != 35),1,0)
    ) effectiveSum,
    sum(/*合计总通电*/
    if( (cpr.pr_time is not null),1,0)
    ) countSum,
    count(/*合计个案量*/
    DISTINCT (
    if( (cpr.pr_time is not null),cpr.pr_cas_id,null)
    )
    ) countCaseSum

    from case_phone_record cpr
    LEFT JOIN bank_case bc on cpr.pr_cas_id = bc.cas_id
    LEFT JOIN company_employ ce on ce.se_no = cpr.pr_se_no
    where
    cpr.pr_se_no in
     (  4,5,6) 
    and cpr.pr_time   >=   '2017-05-03'
    and cpr.pr_time   <=   '2018-01-12'
    GROUP BY cpr.pr_se_no
		order by ce.se_name DESC