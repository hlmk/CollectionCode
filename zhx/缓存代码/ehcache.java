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
        
        <!-- ��Ȩ���� -->
    	<cache name="authorizationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
    	</cache>
    	
    	<!-- ��֤���� -->
    	<cache name="authenticationCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
   		 </cache>

	<!-- ͳ����Ϣ���� -->
	<cache name="countCache"
		   eternal="false"
		   maxElementsInMemory="500"
		   overflowToDisk="false"
		   diskPersistent="false"
		   timeToIdleSeconds="0"
		   timeToLiveSeconds="1800"
		   memoryStoreEvictionPolicy="LFU" />

	<!--�����ֵ仺�� -->
	<cache name="systemDictionaryCache" eternal="false"
		maxElementsInMemory="500" overflowToDisk="false" 
		diskPersistent="false"
		timeToIdleSeconds="0" 
		timeToLiveSeconds="1800"
		memoryStoreEvictionPolicy="LFU" /> 
   		 
   		 <!-- ��ťȨ�޻���,����JSȨ����֤ -->
    	<cache name="functionValidateCache"
           maxEntriesLocalHeap="2000"
           eternal="false"
           timeToIdleSeconds="3600"
           timeToLiveSeconds="0"
           overflowToDisk="false"
           statistics="true">
   		 </cache>


	<!--��¼��ػ���
		��������ԣ�
			name�� Cache�����ƣ�������Ψһ��(ehcache������cache�ŵ�HashMap��)��
			eternal���趨�����elements�Ƿ���Զ�����ڡ����Ϊtrue���򻺴������ʼ����Ч�����Ϊfalse��ô��Ҫ����timeToIdleSeconds��timeToLiveSeconds�жϡ�
			maxElementsInMemory�����ڴ��л����element�������Ŀ�� �������cache�е�Ԫ�س��������ֵ�������������
									1����overflowToDisk������ֵΪtrue���Ὣcache�ж����Ԫ�ط�������ļ��С�
									2����overflowToDisk������ֵΪfalse�������memoryStoreEvictionPolicy�Ĳ����滻cache��ԭ�е�Ԫ�ء�
			overflowToDisk�� ����ڴ������ݳ����ڴ����ƣ��Ƿ�Ҫ���浽�����ϡ�
			maxElementsOnDisk���ڴ����ϻ����element�������Ŀ��Ĭ��ֵΪ0����ʾ�����ơ�
		���������ǿ�ѡ�ģ�
			timeToIdleSeconds�� �������ʱ�䣬ָ�����ڶ೤ʱ��û�б����ʾͻ�ʧЧ��ֻ��eternalΪfalse����Ч��Ĭ��ֵ0����ʾһֱ���Է��ʡ�����Ϊ��λ��
			timeToLiveSeconds�� ������ʱ�䣬ָ����Ӵ�����ʧЧ����Ҫ��ʱ�䡣ֻ��eternalΪfalse����Ч��Ĭ��ֵ0����ʾһֱ���Է��ʡ�����Ϊ��λ��
			diskPersistent�� �Ƿ��ڴ����ϳ־û���ָ����jvm�������Ƿ���Ч��Ĭ��Ϊfalse��
			diskExpiryThreadIntervalSeconds�� �������߳�����ʱ��������ʶ����״̬���̶߳೤ʱ������һ�Ρ�����Ϊ��λ��
			diskSpoolBufferSizeMB�� DiskStoreʹ�õĴ��̴�С��Ĭ��ֵ30MB��ÿ��cacheʹ�ø��Ե�DiskStore��
			memoryStoreEvictionPolicy�� ����ڴ������ݳ����ڴ����ƣ�����̻���ʱ�Ĳ��ԡ�Ĭ��ֵLRU����ѡFIFO��LFU��
			�����3 ����ղ��� ��
			FIFO ��first in first out (�Ƚ��ȳ�).
			LFU �� Less Frequently Used (����ʹ��).��˼��һֱ�������ٱ�ʹ�õġ������Ԫ����һ��hit ���ԣ�hit ֵ��С�Ľ��ᱻ������档
			LRU ��Least Recently Used(�������ʹ��). (ehcache Ĭ��ֵ).�����Ԫ����һ��ʱ������������������ˣ�������Ҫ�ڳ��ط��������µ�Ԫ�ص�ʱ����ô���л���Ԫ����ʱ����뵱ǰʱ����Զ��Ԫ�ؽ���������档
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