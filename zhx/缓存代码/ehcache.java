<?xml version="1.0" encoding="UTF-8"?>  
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"  
    updateCheck="false">  
      
    <diskStore path="java.io.tmpdir" />  
      
    <defaultCache eternal="false"   
        maxElementsInMemory="1000"  
        overflowToDisk="false"   
        diskPersistent="false"   
        timeToIdleSeconds="0"  
        timeToLiveSeconds="1800"   
        memoryStoreEvictionPolicy="LFU" />  
  
    <cache name="baseCache"   
        eternal="false"
        maxElementsInMemory="500"  
        overflowToDisk="false"   
        diskPersistent="false"   
        timeToIdleSeconds="0"  
        timeToLiveSeconds="1800"   
        memoryStoreEvictionPolicy="LFU" />  
  
  	  <cache name="loginCache"   
        eternal="false"
        maxElementsInMemory="500"  
        overflowToDisk="false"   
        diskPersistent="false"   
        timeToIdleSeconds="0"  
        timeToLiveSeconds="1800"   
        memoryStoreEvictionPolicy="LFU" /> 
        
        <!-- 授权缓存 -->
    	<cache name="authorizationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
    	</cache>
    	
    	<!-- 认证缓存 -->
    	<cache name="authenticationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
   		 </cache>

	<!-- 统计信息缓存 -->
	<cache name="countCache"
		   eternal="false"
		   maxElementsInMemory="500"
		   overflowToDisk="false"
		   diskPersistent="false"
		   timeToIdleSeconds="0"
		   timeToLiveSeconds="1800"
		   memoryStoreEvictionPolicy="LFU" />

	<!--数据字典缓存 -->
	<cache name="systemDictionaryCache" eternal="false"
		maxElementsInMemory="500" overflowToDisk="false" 
		diskPersistent="false"
		timeToIdleSeconds="0" 
		timeToLiveSeconds="1800"
		memoryStoreEvictionPolicy="LFU" /> 
   		 
   		 <!-- 按钮权限缓存,用于JS权限验证 -->
    	<cache name="functionValidateCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
   		 </cache>


	<!--登录相关缓存
		必须的属性：
			name： Cache的名称，必须是唯一的(ehcache会把这个cache放到HashMap里)。
			eternal：设定缓存的elements是否永远不过期。如果为true，则缓存的数据始终有效，如果为false那么还要根据timeToIdleSeconds，timeToLiveSeconds判断。
			maxElementsInMemory：在内存中缓存的element的最大数目。 如果放入cache中的元素超过这个数值，有两种情况：
									1、若overflowToDisk的属性值为true，会将cache中多出的元素放入磁盘文件中。
									2、若overflowToDisk的属性值为false，会根据memoryStoreEvictionPolicy的策略替换cache中原有的元素。
			overflowToDisk： 如果内存中数据超过内存限制，是否要缓存到磁盘上。
			maxElementsOnDisk：在磁盘上缓存的element的最大数目，默认值为0，表示不限制。
		以下属性是可选的：
			timeToIdleSeconds： 对象空闲时间，指对象在多长时间没有被访问就会失效。只对eternal为false的有效。默认值0，表示一直可以访问。以秒为单位。
			timeToLiveSeconds： 对象存活时间，指对象从创建到失效所需要的时间。只对eternal为false的有效。默认值0，表示一直可以访问。以秒为单位。
			diskPersistent： 是否在磁盘上持久化。指重启jvm后，数据是否有效。默认为false。
			diskExpiryThreadIntervalSeconds： 对象检测线程运行时间间隔。标识对象状态的线程多长时间运行一次。以秒为单位。
			diskSpoolBufferSizeMB： DiskStore使用的磁盘大小，默认值30MB。每个cache使用各自的DiskStore。
			memoryStoreEvictionPolicy： 如果内存中数据超过内存限制，向磁盘缓存时的策略。默认值LRU，可选FIFO、LFU。
			缓存的3 种清空策略 ：
			FIFO ，first in first out (先进先出).
			LFU ， Less Frequently Used (最少使用).意思是一直以来最少被使用的。缓存的元素有一个hit 属性，hit 值最小的将会被清出缓存。
			LRU ，Least Recently Used(最近最少使用). (ehcache 默认值).缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。
	-->
	<cache name="countCache"
		   eternal="true"
		   maxElementsInMemory="500"
		   overflowToDisk="false"
		   diskPersistent="false"
		   timeToIdleSeconds="0"
		   timeToLiveSeconds="1800"
		   memoryStoreEvictionPolicy="LFU" />
</ehcache>  